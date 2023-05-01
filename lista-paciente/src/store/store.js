import { createStore } from "vuex"

export default createStore({
  state: {
    pacientes: [],
    isLogged: ''
  },
  getters: {
    getPacientes(state) {
      return state.pacientes
    }
  },
  mutations: {
    adicionarPaciente(state, paciente) {
      state.paciente.push(paciente)
    },
    removerPaciente(state, idPaciente) {
      state.pacientes = state.paciente.filter((el) => el.id !== idPaciente)
    },
    atualizarPaciente(state, paciente) {
      const pacienteObj = state.paciente.find((el) => el.id === paciente.id)
      console.log(pacienteObj)
    },
    logarUsuario() {
      console.log('ere')
    }
  }
})
