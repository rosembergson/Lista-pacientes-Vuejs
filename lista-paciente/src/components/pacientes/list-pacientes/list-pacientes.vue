<template>
  <div>
    <div v-if="openModal">
      <addPaciente :paciente="pacienteEdit"></addPaciente>
      <button @click="hideModal"> fechar sessão de adicionar paciente </button>
    </div>
  
    <button @click="showModal" v-if="!openModal"> adicionar paciente + </button>
    <p> lista de Pacientes </p>
    <div class="container-list-pacientes" v-if="pacientes.length > 0">
      <ul>
        <li class="list-pacientes-item" v-for="paciente in pacientes" :key="paciente.id" :disabled="!toEdit">
          <label>
            Nome: 
            <input type="text" v-model="paciente.nome" :disabled="!toEdit">
          </label>
          <label>
            Nome da mãe:
            <input type="text" v-model="paciente.nomeMae" :disabled="!toEdit">
          </label>
          <label>
            Data de Nascimento:
            <input type="date" v-model="paciente.bday" :disabled="!toEdit">
          </label>
          <label>
            CPF:
            <input type="text" v-model="paciente.CPF" @input="maskCpf" @focusout="getCPF" :disabled="!toEdit">
          </label>
          <label>
            CNS:
            <input type="text" v-model="paciente.CNS" :disabled="!toEdit">
          </label>

          <p class="address"> Endereço </p>
          <label>
            Cep:
            <input type="text" v-model="paciente.cep" :disabled="!toEdit">
          </label>
          <label>
            Rua:
            <input type="text" v-model="paciente.rua" :disabled="!toEdit">
          </label>

          <label>
            Número:
            <input type="text" v-model="paciente.numero" :disabled="!toEdit">
          </label>
          <label>
            Bairro:
            <input type="text" v-model="paciente.bairro" :disabled="!toEdit">
          </label>
          <label>
            Cidade:
            <input type="text" v-model="paciente.cidade" :disabled="!toEdit">
          </label>
          <label>
            Pais:
            <input type="text" v-model="paciente.pais" :disabled="!toEdit">
          </label>

          <div class="acoes-pacientes">
            <button @click="editarPassageiro(paciente)"> Editar paciente </button>
            <button class="remover-paciente" @click="removerPassageiro(paciente.id)"> Excluir paciente </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import './list-pacientes.css'
  import addPaciente from '../add-paciente/add-paciente.vue';
  import Axios from 'axios';
  
  export default {
    components: {
      addPaciente
    },
    data() {
      return {
        pacientes: [],
        pacienteEdit: "",
        openModal: false,
        toEdit: false
      }
    },
    mounted() {
      Axios.get('http://localhost:3000/pacientes')
        .then((response) => {
          this.pacientes = response.data
        })
        .catch((err) => {
          console.error(err)
          this.pacientes = []
        })
    },
    methods: {
      editarPassageiro(pacienteObj) {
        console.log(pacienteObj)
        this.toEdit = true
      },
      removerPassageiro(idPaciente) {
        Axios.delete(`http://localhost:3000/pacientes/${idPaciente}`)
          .then(() => {
            alert('Paciente removido com sucesso!')
            window.location.reload()
          })
          .catch((err) => {
            console.error(err)
            alert('Erro ao remover paciente!')
          })
      },
      showModal() {
        this.openModal = true
      },
      hideModal() {
        this.openModal = false
      }
    }
  }
</script>
