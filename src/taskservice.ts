import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { CredentialManager } from "./credential/credential";

@Injectable()
export class TasksService {
  private readonly logger = new Logger("Credentials Manager");

  constructor(private http: HttpService) {
    this.getCredentials();
  }

  @Cron(CronExpression.EVERY_MINUTE)
  handleCron() {
    this.getCredentials();
  }

  private getCredentials() {
    const payload = {
      client_id: process.env.CLIENT_ID,
      grant_type: process.env.GRANT_TYPE,
      client_secret: process.env.CLIENT_SECRET,
    };

    const data = Object.keys(payload)
      .map((key) => `${key}=${encodeURIComponent(payload[key])}`)
      .join("&");

    const options: any = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: data,
      url: `${process.env.CELCOIN_URL}/token`,
    };

    this.http
      .axiosRef(options)
      .then((d: any) => {
        this.logger.log("TOKEN DE AUTENTICAÇÃO ADQUIRIDO COM SUCESSO");
        CredentialManager.credentials = `Bearer ${d.data.access_token}`;
        this.http.axiosRef.defaults.headers.common["Authorization"] =
          CredentialManager.credentials;
      })
      .catch(() => {
        this.logger.error("ERRO AO ADQUIRIR TOKEN DE AUTENTICAÇÃO");
      });
  }
}
