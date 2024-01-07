import { defineStore } from 'pinia';
import api from '../services/api';

export const useApiStore = defineStore({
  id: 'methods',
  state: () => ({
    pokemons: [], 
    currentPage: 1,
    itemsPerPage: 10,
    totalPokemons: 0,
  }),
  actions: {
    async deletePokemon(numeroPokedex, headers) {
      try {
        await api.delete(`http://localhost:3000/pokemon/borrar/${numeroPokedex}`, { headers });
      } catch (error) {
        console.error('Error al borrar el Pokémon:', error);
   
      }
    },
    async addPokemon(pokemon, headers) {
      try {
        const response=await api.post(`http://localhost:3000/pokemon/crear/`,pokemon, { headers });
        return response;
      } catch (error) {
        console.error('Error al borrar el Pokémon:', error);
        throw error;

      }
    },
    async getAllPokemons(currentPage) {
      try {
        const response = await api.get(`http://localhost:3000/pokemon?page=${currentPage}`);
        console.log("RESPUESTA TIENDA",response.data);
        if (response.status === 200) {
          const responseData = response.data;

          this.pokemons = responseData.pokemons;
          this.currentPage = responseData.currentPage;
          this.totalPages = responseData.totalPages;
          this.itemsPerPage = responseData.itemsPerPage;
         
          
          return responseData;
        } else {
          console.error('Error al obtener la lista de Pokémon:', response.data.error);

        }
      } catch (error) {
        console.error('Error al obtener la lista de Pokémon:', error);
        throw error;
      }
    },
    
    
    
    async setPage(page) {
      this.currentPage = page;
      await this.getAllPokemons();
    },
    
    async setItemsPerPage(itemsPerPage) {
      this.itemsPerPage = itemsPerPage;
      await this.getAllPokemons();
    },
   
    async findPokemon(item) {
        try {
          const response = await api.get(`/pokemon/buscar/${item}`);
          console.log("RESPUESTA TIENDA",response.data);
          return response;
        } catch (error) {
          console.error('Error al obtener el Pokémon:', error);
          throw error;
        }
      },
  
      async mostrarTiposPokemon() {
        try {
          const response = await api.get('/pokemon/tipos');
          return response; 
        } catch (error) {
          console.error('Error al obtener los tipos de Pokémon:', error);
          throw error; 
        }
      },
  
      async obtenerPokemonAleatorio() {
        try {
          const response = await api.get('/pokemon/random');
          return response; 
        } catch (error) {
          console.error('Error al obtener el Pokémon aleatorio:', error);
          throw error; 
        }
      },
  
      async obtenerDetallesEvolucion(item) {
        try {
          const response = await api.get(`/pokemon/${item}/evolucion`);
          return response; 
        } catch (error) {
          console.error('Error al obtener los detalles de evolución del Pokémon:', error);
          throw error; 
        }
      },
  
      async filtrarPorTipo(tipo, page, perPage) {
        try {
          const response = await api.get(`/pokemon/tipo/${tipo}?page=${page}&per_page=${perPage}`);
          return response; 
        } catch (error) {
          console.error('Error al filtrar los Pokémon por tipo:', error);
          throw error; 
        }
      },
  
      async verPerfilModerador(item) {
        try {
          const token = localStorage.getItem('token'); 
          const headers = {
            Authorization: `${token}`,
          };
      
          const response = await api.get(`http://localhost:3000/moderador/ver/${item}`, { headers });
      
          console.log('Respuesta de la API:', response);
          return response.data;
        } catch (error) {
          console.error('Error al ver el perfil del moderador:', error);
          throw error;
        }
      },
      async loginuser(user,password) {
        try {
          const response = await api.post('http://localhost:3000/moderador/login', {
            Usuario: user,
            Contrasena: password
          } );
          return response;     
        }
        catch (error) {
          console.error('Error al obtener los Pokémon:', error);
          throw error;
        }
      },
      async actualizarPokemon(pokemon, headers,id) {
        try {
          const response=await api.put(`/pokemon/actualizar/${id}`,pokemon, { headers });
          return response;
        } catch (error) {
          console.error('Error al borrar el Pokémon:', error);
          throw error;
          
        }
    },
  },
});