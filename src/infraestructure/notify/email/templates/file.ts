import {MFile} from "../../../../model/file";
import {MainTemplate} from "./main";

export class FileTemplate {
    static template(item: MFile): any {
        const message = `Hola, te enviamos este correo adjuntando archivo ${item.nameFileSendingNoFormat} con: ${item.description}`

        const template = `
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
                <td class="p30-15-0" style="
                    padding: 50px 30px 0px;
                    padding: 30px;
                    border-bottom: 1px solid #ebebeb; " bgcolor="#ffffff">
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
                                Historias Clinicas
                            </td>
                        </tr>
                        <tr>
                            <td style="
                                  color: #000000;
                                  font-family: 'Raleway', Arial, sans-serif;
                                  font-size: 16px;
                                  line-height: 36px;
                                  text-align: center;
                                  padding-bottom: 30px;
                                ">
                                ${message} 
                            </td>
                        </tr>    
                    </table>
                </td>
            </tr>
        </table>
        
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
                                <p>Cualquier consulta a: <a style="color: #1e52bd"
                                        href="mailto:holosaludti@gmail.com">holosaludti@gmail.com</a></p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>`

        return MainTemplate.main(template)
    }
}
