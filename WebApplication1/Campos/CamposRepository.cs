using Dapper;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace WebApplication1.Campos
{
    public class CamposRepository
    {
        private string connectionString;
        public CamposRepository()
        {
            connectionString = @"Data Source=DESKTOP-U16IUAR\SQLEXPRESS; Initial Catalog=eductech_clientes;Integrated Security=true";

        }
        public IDbConnection Connection
        {
            get
            {
                return new SqlConnection(connectionString);
            }
        }

        public void Add(Campos_tabla campos)
        {
            using(IDbConnection dbConnection = Connection)
            {
                string sQuery = @"insert into SB_clientes( nombre, teléfono, email) Values(@nombre,@teléfono,@email )";
                dbConnection.Open();
                dbConnection.Execute(sQuery, campos);
            }
        }
        public IEnumerable<Campos_tabla> GetAll()
        {
            using (IDbConnection dbConnection = Connection)
            {
                string sQuery = @"select * from SB_clientes";
                dbConnection.Open();
                return dbConnection.Query<Campos_tabla>(sQuery);
            }
        }
        public Campos_tabla GetById(int id)
        {
            using (IDbConnection dbConnection = Connection)
            {
                string sQuery = @"Select * From Sb_clientes where código= @id";
                dbConnection.Open();
                return dbConnection.Query<Campos_tabla>(sQuery, new { Id = id }).FirstOrDefault();
            }
        }
        public void Delete(int id)
        {
            using (IDbConnection dbConnection = Connection)
            {
                string sQuery = @"Delete From Sb_clientes where código= @id";
                dbConnection.Open();
                dbConnection.Execute(sQuery, new { Id = id });
            }
        }
        public void Update(Campos_tabla campos)
        {
            using (IDbConnection dbConnection = Connection)
            {
                string sQuery = @"update Sb_clientes SET  nombre=@nombre, teléfono=@teléfono, email=@email where código=@código" ;
                dbConnection.Open();
                dbConnection.Query(sQuery, campos);
            }
        }
    }
}
