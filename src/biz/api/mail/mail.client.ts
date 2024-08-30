import { Injectable } from "@nestjs/common";
import { Transporter, createTransport } from "nodemailer";
import { CustomInternalServerErrorExceptionApiG } from "src/http/apiGee/http.apiGee.exception";
import MailBodyDto from "./dto/mailBody.dto";

@Injectable()
export default class MailClient {
  private readonly transporter: Transporter;
  constructor() {
    this.transporter = createTransport({
      service: "gmail",
      auth: {
        user: "filmplus.office@gmail.com",
        pass: "jafakeks",
      },
    });
  }

  async sendMail(body: MailBodyDto, apiCode: string): Promise<any> {
    const { to, subject, text } = body;
    const mailOptions = {
      from: "filmplus.office@gmail.com",
      to,
      subject,
      text,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      return {
        code: 200,
        data: info,
        message: "Email has been sent.",
      };
    } catch (error) {
      console.log(error);
      throw new CustomInternalServerErrorExceptionApiG(
        apiCode,
        null,
        "Email not send"
      ).exception;
    }
  }
}
