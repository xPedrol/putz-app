import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {createRequestOption} from '../core/utils/request-util';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {IRenderBot, RenderBot} from '../models/render-bot.models';

export type queryType = { bots: IRenderBot[], headers: HttpHeaders };
export type EntityResponseType = HttpResponse<IRenderBot>;
export type EntityArrayResponseType = HttpResponse<IRenderBot[]>;

@Injectable({
  providedIn: 'root'
})
export class BotService {
  botGuides$: BehaviorSubject<queryType | null>;
  totalCount$: BehaviorSubject<number>;

  constructor(
    protected http: HttpClient
  ) {
    this.botGuides$ = new BehaviorSubject<queryType | null>(null);
    this.totalCount$ = new BehaviorSubject<number>(0);
  }

  convertEntityArrayResponseType(res: EntityArrayResponseType,save = true): queryType {
    const bots: IRenderBot[] = this.convertBots(res.body);
    const req = {bots, headers: res.headers};
    if(save) {
      this.setBots(req);
    }
    return req;
  }


  query(req?: any,save = true): Observable<queryType> {
    const options = createRequestOption(req);
    return this.http
      .get<IRenderBot[]>(`${environment.API_URL}render/bots`, {
        params: options,
        observe: 'response'
      })
      .pipe(map((res: EntityArrayResponseType) => this.convertEntityArrayResponseType(res,save)));
  }

  convertBots(botGuides: IRenderBot[] | null): IRenderBot[] {
    if (botGuides && botGuides?.length > 0) {
      return botGuides.map(botGuide => {
        return this.convertBot(botGuide);
      });
    }
    return [];
  }

  convertBot(bot: IRenderBot | null): IRenderBot {
    return new RenderBot(bot);
  }

  setBots(req: queryType | null = null): void {
    if (req && req?.headers) {
      this.totalCount$.next(Number(req.headers.get('X-Total-Count')));
    }
    this.botGuides$.next(req);
  }

  clearBots(): void {
    this.botGuides$.next(null);
    this.totalCount$.next(0);
  }
}
