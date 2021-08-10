using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using System.Web;

namespace wap_modules.WebForms.AdminUserDR.Model
{
    public class Pedimento
    {
        public static ResultCustomDeclaration GetCustomsDeclarations(List<string> Patentes, List<string> Aduanas, List<string> Pedimentos, string fecha_de_pago_inicio, string fecha_de_pago_final, string CustomerID)
        {

            bool exists_pedimentos = true;

            if (Pedimentos.Count == 0)
            {
                exists_pedimentos = false;
            }

            bool exists_patentes = true;

            if (Patentes.Count == 0)
            {
                exists_patentes = false;
            }

            bool exists_aduanas = true;

            if (Aduanas.Count == 0)
            {
                exists_aduanas = false;
            }

            bool exists_fecha_de_pago_inicio = false;

            if (fecha_de_pago_inicio != "")
            {
                exists_fecha_de_pago_inicio = true;
            }

            bool exists_fecha_de_pago_final = false;

            if (fecha_de_pago_final != "")
            {
                exists_fecha_de_pago_final = true;
            }

            string format = "yyyy-MM-dd";


            DateTime FechaDePagoInicio = DateTime.Now;


            if (exists_fecha_de_pago_inicio)
            {
                FechaDePagoInicio = DateTime.ParseExact(fecha_de_pago_inicio, format, CultureInfo.InvariantCulture);
            }

            DateTime FechaDePagoFinal = DateTime.Now;

            if (exists_fecha_de_pago_final)
            {
                FechaDePagoFinal = DateTime.ParseExact(fecha_de_pago_final, format, CultureInfo.InvariantCulture);
            }

            ResultCustomDeclaration oResult = new ResultCustomDeclaration();

            oResult.Response = new Message();

            oResult.Customs = new List<CustomDeclaration>();

            string _STRING_CONNECTION = ConfigurationManager.ConnectionStrings["MortemConnectionString"].ConnectionString;

            string sql = @"
SELECT TOP 9999 
vc.Numero AS CUSTOMER_CODE
, vc.Nombre AS CUSTOMER_NAME
, CONVERT(DATE, vp.FechaDePago) as FECHA_DE_PAGO
, vp.Patente AS PATENTE
, vp.Aduana AS ADUANA
, vp.Pedimento AS PEDIMENTO
, vp.Clave AS CLAVE 
, (CASE
    WHEN vp.Tipo = 1 THEN 'Importación'
    WHEN vp.Tipo = 2 THEN 'Exportación'
    ELSE 'Sin Identificar'
END)  AS TIPO
, (CASE
    WHEN vp.Regimen = 1 THEN 'Definitivo'
    WHEN vp.Regimen = 2 THEN 'Temporal'
    ELSE 'Sin Identificar'
END)  AS REGIMEN
--, vp.* 
FROM VT_Pedimentos vp 
INNER JOIN VT_Clientes vc ON vc.ID = vp.Cliente
WHERE 
vc.Numero LIKE @Numero--vp.Pedimento LIKE @Pedimento
AND vp.FechaDePago IS NOT NULL
";
            if (!exists_aduanas)
            {
                Aduanas.Add("110");
                Aduanas.Add("190");
                Aduanas.Add("230");
                Aduanas.Add("390");
                Aduanas.Add("400");
                Aduanas.Add("402");
            }

            string aduanas = ConstructorAduanas(Aduanas);

            sql = sql + aduanas;

            if (!exists_patentes)
            {
                Patentes.Add("3621");
                Patentes.Add("3446");
                Patentes.Add("3989");
            }

            string patentes = ConstructorPatentes(Patentes);

            sql = sql + patentes;

            if (exists_pedimentos)
            {
                string pedimentos = ConstructorPedimentos(Pedimentos);

                sql = sql + pedimentos;
            }

            if (exists_fecha_de_pago_inicio && exists_fecha_de_pago_final)
            {
                sql = sql +
@" AND CONVERT(DATE, vp.FechaDePago) >= CONVERT(DATE, @FechaDePagoInicio) 
AND CONVERT(DATE, vp.FechaDePago) <= CONVERT(DATE, @FechaDePagoFinal) ";
            }
            else if (exists_fecha_de_pago_final)
            {
                sql = sql +
@" AND CONVERT(DATE, vp.FechaDePago) = CONVERT(DATE, @FechaDePagoFinal) ";
            }

            using (SqlConnection conn = new SqlConnection(_STRING_CONNECTION))
            {
                SqlCommand cmd = new SqlCommand(sql, conn);

                var table = new DataTable();

                if (exists_fecha_de_pago_inicio && exists_fecha_de_pago_final)
                {
                    cmd.Parameters.AddWithValue("@FechaDePagoInicio", FechaDePagoInicio.ToString("MM/dd/yyyy"));
                    cmd.Parameters.AddWithValue("@FechaDePagoFinal", FechaDePagoFinal.ToString("MM/dd/yyyy"));
                }
                else if (exists_fecha_de_pago_final)
                {
                    cmd.Parameters.AddWithValue("@FechaDePagoFinal", FechaDePagoFinal.ToString("MM/dd/yyyy"));
                }

                cmd.Parameters.Add("@Numero", SqlDbType.VarChar);
                CustomerID = "%" + CustomerID + "%";
                cmd.Parameters["@Numero"].Value = CustomerID;

                try
                {
                    conn.Open();
                    var adaptador = new SqlDataAdapter(cmd);
                    adaptador.Fill(table);
                    foreach (DataRow row in table.Rows)
                    {
                        CustomDeclaration oCustom = new CustomDeclaration();

                        DateTime FECHA = (DateTime)row["FECHA_DE_PAGO"];

                        oCustom.CODE = (string)row["CUSTOMER_CODE"];
                        oCustom.CUSTOMER_NAME = (string)row["CUSTOMER_NAME"];
                        oCustom.FECHA = FECHA.ToString("dd/MM/yyyy");//(string)row["FECHA_DE_PAGO"];
                        oCustom.PATENTE = (string)row["PATENTE"];
                        oCustom.ADUANA = (string)row["ADUANA"];
                        oCustom.PEDIMENTO = (string)row["PEDIMENTO"];
                        oCustom.CLAVE = (string)row["CLAVE"];
                        oCustom.TIPO = (string)row["TIPO"];
                        oCustom.REGIMEN = (string)row["REGIMEN"];

                        oResult.Customs.Add(oCustom);
                    }
                    if (oResult.Customs.Count == 0)
                    {
                        oResult.Response.StatusCode = 401;
                        oResult.Response.Description = "No se encontraron pedimentos.";
                        oResult.Customs = null;
                    }
                    else if (oResult.Customs.Count > 0)
                    {
                        oResult.Response.StatusCode = 200;
                        oResult.Response.Description = "Se encontraron " + oResult.Customs.Count + " pedimentos.";
                    }
                }
                catch (Exception e)
                {
                    oResult.Response.StatusCode = 501;
                    oResult.Response.Description = e.Message;
                    oResult.Customs = null;
                }
            }
            return oResult;
        }
        public static string ConstructorPatentes(List<string> Patentes)
        {
            string sql = "AND vp.Patente IN ";
            sql = sql +
            "(";

            int Count = 0;

            foreach (string Patente in Patentes)
            {
                Count++;

                if (Count == 1)
                {
                    sql = sql + Patente;
                }
                else
                {
                    sql = sql + "," + Patente;
                }
            }

            sql = sql +
                ")";

            sql = sql + "\n";

            return sql;
        }
        public static string ConstructorAduanas(List<string> Aduanas)
        {

            string sql = "AND vp.Aduana IN ";

            sql = sql +
            "(";
            int Count = 0;
            foreach (string Aduana in Aduanas)
            {

                Count++;

                if (Count == 1)
                {
                    sql = sql + Aduana;
                }
                else
                {
                    sql = sql + "," + Aduana;
                }

            }
            sql = sql +
            ")";

            sql = sql + "\n";

            return sql;
        }
        public static string ConstructorPedimentos(List<string> Pedimentos)
        {

            string sql = "AND vp.Pedimento IN ";

            sql = sql +
            "(";
            int Count = 0;
            foreach (string Pedimento in Pedimentos)
            {

                Count++;

                if (Count == 1)
                {
                    sql = sql + Pedimento;
                }
                else
                {
                    sql = sql + "," + Pedimento;
                }

            }
            sql = sql +
            ")";

            sql = sql + "\n";

            return sql;
        }
    }
}