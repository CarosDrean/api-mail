import {MMailWeb} from "../../../../model/mailweb";
import {MainTemplate} from "./main";

export class MailWebTemplate {
    static template(item: MMailWeb): any {
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
                                Pedido de Cotizacion
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
                                                Empresa
                                            </th>
                                            <td>${item.business}</td>
                                        </tr>
        
                                        <tr>
                                            <th scope="col" style="text-align: left">
                                                RUD/DNI
                                            </th>
                                            <td>${item.ruc}</td>
                                        </tr>
                                        <tr>
                                            <th scope="col" style="text-align: left">
                                                Celular
                                            </th>
                                            <td>${item.phone}</td>
                                        </tr>
                                        <tr>
                                            <th scope="col" style="text-align: left">
                                                Correo Electronico
                                            </th>
                                            <td>${item.email}</td>
                                        </tr>
                                        <tr>
                                            <th scope="col" style="text-align: left">
                                                Mensaje
                                            </th>
                                            <td>${item.consult}</td>
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
                                HoloSalud - Solicitud de Cotizacion
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>`

        return MainTemplate.main(template)
    }
}
