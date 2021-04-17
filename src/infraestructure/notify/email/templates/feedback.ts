import {MFeedback} from "../../../../model/feedback";
import {MainTemplate} from "./main";

export class FeedbackTemplate {
    static template(feedback: MFeedback): any {
        const template = `
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
                <td class="p30-15-0" style="
                  padding: 50px 30px 0px;
                  padding: 30px;
                  border-bottom: 1px solid #ebebeb;
                " bgcolor="#ffffff">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                            <td style="
                        color: #000000;
                        font-family: 'Raleway', Arial, sans-serif;
                        font-size: 32px;
                        line-height: 36px;
                        text-align: center;
                        padding-bottom: 30px;
                      ">
                                Feedback
                            </td>
                        </tr>
                        <tr>
                            <td class="text-center" style="
                        color: #5d5c5c;
                        font-family: 'Raleway', Arial, sans-serif;
                        font-size: 14px;
                        line-height: 22px;
                        text-align: center;
                        padding-bottom: 22px;
                      ">
                                <center>
                                    <table style="width: 80%">
                                        <tr>
                                            <th scope="col" style="text-align: left">
                                                Correo
                                            </th>
                                            <td>${feedback.email}</td>
                                        </tr>
                                        <tr>
                                            <th scope="col" style="text-align: left">
                                                Usuario
                                            </th>
                                            <td>${feedback.user}</td>
                                        </tr>
                                        <tr>
                                            <th scope="col" style="text-align: left">
                                                Tipo
                                            </th>
                                            <td>${feedback.type}</td>
                                        </tr>
                                        <tr>
                                            <th scope="col" style="text-align: left">
                                                Mensaje
                                            </th>
                                            <td>${feedback.message}</td>
                                        </tr>
                                    </table>
                                </center>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <!-- END Section 1 -->
        
        <!-- Footer -->
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
                <td class="p30-15-0" bgcolor="#ffffff" style="
                  border-radius: 0px 0px 20px 20px;
                  padding: 10px 30px 0px 30px;
                ">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                            <td style="
                  color: #000000;
                  font-family: 'Raleway', Arial, sans-serif;
                  font-size: 15px;
                  line-height: 36px;
                  width: 80%;
                  text-align: center;
                  padding-bottom: 10px;
                  ">
                                HoloSalud - feedback
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>`

        return MainTemplate.main(template)
    }
}
