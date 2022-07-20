import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RenderUploadService {

  settings = {
    skipCleanup: true,
    addLicense: false,
    debug: true,
  };
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'nexrender-secret': environment.RENDER_KEY
    }),
  };

  constructor(
    private http: HttpClient,
  ) {
  }

  async uploadAepFile(file: File) {
    const formData = new FormData();
    formData.append('projectFile', file);

    return await this.http
      .post(environment.RENDER_URL + 'render/upload', formData)
      .toPromise();
  }

  getJson(base: string): Observable<string> {
    return this.http.get(`./assets/json/${base}.json`, {responseType: 'text'});
  }

  changeBaseJSON(json: string, form: FormGroup): any {
    json = json.replace('##TEXTO_CELULAR##', form.get('city')!.value + "\\n" + form.get('uf')!.value);
    json = json.replace('##TEXTO_POST_IT##', "dia\\n" + form.get('date')!.value);
    json = json.replace('##TEXTO_VALOR##', form.get('loanValue')!.value);
    json = json.replace('##TEXTO_TAXA##', form.get('rate')!.value);
    json = json.replace('##TEXTO_PARCELA##', form.get('portionValue')!.value);
    json = json.replace('##AUDIO_GARANTIA##', form.get('warranty')!.value);

    let reason = form.get('reason')!.value;
    json = json.replace('##VIDEO_MOTIVO##', form.get('reason')!.value);
    if (reason == "INSERT_VIAGEM.mp4") {
      json = json.replace('##INSERT_TEXTO##', "Fazer a Viagem dos Sonhos");
    } else {
      json = json.replace('##INSERT_TEXTO##', "Financiar seus estudos");
    }

    let nome = form.get('name')!.value;
    if (nome.toUpperCase() === "ANA") {
      json = json.replace('##AUDIO_NOME##', "Ana.mp3");
    } else if (nome.toUpperCase() === "BRUNO") {
      json = json.replace('##AUDIO_NOME##', "Bruno.mp3");
    } else if (nome.toUpperCase() === "GABRIEL") {
      json = json.replace('##AUDIO_NOME##', "Gabriel.mp3");
    } else if (nome.toUpperCase() === "HENRIQUE") {
      json = json.replace('##AUDIO_NOME##', "Henrique.mp3");
    } else {
      json = json.replace('##AUDIO_NOME##', "Ola.mp3");
    }

    json = json.replace('##TEXTO_NOME##', "Olá, " + form.get('name')!.value);

    return JSON.parse(json);
  }
}
