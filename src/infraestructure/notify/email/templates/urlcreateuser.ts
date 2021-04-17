import {MainTemplate} from "./main";
import {MURLCreateUser} from "../../../../model/urlcreateuser";

export class URLUserTemplate {
    static template(item: MURLCreateUser): any {
        const messageMedic = `Hola, te enviamos este correo con el acceso para que puedas crear tu usuario MEDICO en ${item.business}, ` +
            `y tengas acceso a los examenes realizados a partir del 2021, podrás descargar: historias clinicas, certificados.`
        const messageAdmin = `Hola, te enviamos este correo con el acceso para que puedas crear tu usuario ADMINISTRADOR en ${item.business}, ` +
            `y tengas acceso a los examenes realizados a partir del 2021.`

        const message = item.typeUser === 'Admin' ? messageAdmin : messageMedic

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
                                Crear Usuario Externo
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
                        <tr>
                            <td style="
                                  color: #000000;
                                  font-family: 'Raleway', Arial, sans-serif;
                                  font-size: 16px;
                                  line-height: 36px;
                                  text-align: center;
                                  padding-bottom: 30px;
                                ">
                                <a href="${item.url}" style="background-color: #2444a4; /* Green */
                                            border: none;
                                            color: white;
                                            padding: 12px 32px;
                                            text-align: center;
                                            text-decoration: none;
                                            cursor: pointer;
                                            display: inline-block;
                                            font-size: 16px;">CREAR USUARIO</a>
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
                                -ms-word-break: break-all;
                                word-break: break-all;
                                word-break: break-word;     /* Sólo WebKit -NO DOCUMENTADO */
                            
                                -ms-hyphens: auto;          /* Guiones para separar en sílabas */
                                -moz-hyphens: auto;         /*  depende de lang en <html>      */
                                -webkit-hyphens: auto;
                                hyphens: auto;
                                ">
                                Si el boton no funciona hacer click aqui: <a style="color: #1e52bd"
                                    href="${item.url}">${item.url}</a>
                                <p></p>
                                * Este enlace solo será válido por 3 días desde que se le envío.
                                <p></p>
                                * Ya no se enviarán resultados por email, solo podrá acceder a ellos con su usuario.
                                <p></p>
                                * Usar Google Chrome
                                <p></p>
                                * Considerar manual adjunto.
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
