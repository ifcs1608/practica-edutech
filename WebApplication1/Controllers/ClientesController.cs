using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Campos;
using WebApplication1.context;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientesController : ControllerBase
    {
        private readonly CamposRepository camposRepository;

        public ClientesController()
        {
            camposRepository = new CamposRepository(); 
        }

        // GET: api/<Clientes_Controller>
        [HttpGet]
        public IEnumerable<Campos_tabla> Get()
        {
            return camposRepository.GetAll();
        }

        // GET api/<Clientes_Controller>/5
        [HttpGet("{id}")]
        public Campos_tabla Get(int id)
        {
            return camposRepository.GetById(id);
        }

        // POST api/<Clientes_Controller>
        [HttpPost]
        public void Post([FromBody] Campos_tabla campos_Tabla)
        {
            if(ModelState.IsValid)
            {
                camposRepository.Add(campos_Tabla);
            }
        }

        // PUT api/<Clientes_Controller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Campos_tabla campos_Tabla)
        {
            campos_Tabla.Código = id;
            if (ModelState.IsValid)
            {
                camposRepository.Update(campos_Tabla);
            }
        }

        // DELETE api/<Clientes_Controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            camposRepository.Delete(id);
        }
    }
}
