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
        <li class="list-pacientes-item" v-for="paciente in pacientes" :key="paciente.id">
          <label>
            Nome: 
            <input type="text" v-model="paciente.nome" :disabled="!paciente.isShow">
          </label>
          <label>
            Nome da mãe:
            <input type="text" v-model="paciente.nomeMae" :disabled="!paciente.isShow">
          </label>
          <label>
            Data de Nascimento:
            <input type="date" v-model="paciente.dataNascimento" :disabled="!paciente.isShow">
          </label>
          <label>
            CPF:
            <input type="text" v-model="paciente.CPF" @input="maskCpf($event, paciente.CPF)" @focusout="getCPF" :disabled="!paciente.isShow">
          </label>
          <label>
            CNS:
            <input type="text" v-model="paciente.CNS" :disabled="!paciente.isShow" @focusout="handleCNS">
          </label>

          <p class="address"> Endereço </p>
          <label>
            Cep:
            <input type="text" v-model="paciente.cep" :disabled="!paciente.isShow" @input="maskCep($event, paciente.cep)">
          </label>
          <label>
            Rua:
            <input type="text" v-model="paciente.rua" :disabled="!paciente.isShow">
          </label>

          <label>
            Número:
            <input type="text" v-model="paciente.numero" :disabled="!paciente.isShow">
          </label>
          <label>
            Bairro:
            <input type="text" v-model="paciente.bairro" :disabled="!paciente.isShow">
          </label>
          <label>
            Cidade:
            <input type="text" v-model="paciente.cidade" :disabled="!paciente.isShow">
          </label>
          <label>
            Pais:
            <input type="text" v-model="paciente.pais" :disabled="!paciente.isShow">
          </label>

          <div class="acoes-pacientes">
            <button @click="salvarPassageiro(paciente)" v-if="paciente.isShow"> Salvar dados do paciente </button>
            <button @click="editarPassageiro(paciente)" v-if="!paciente.isShow"> Editar paciente </button>
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
  import { formatCPF, formatCep, checkFormatCNS } from '@/components/utils/utils';
  
  export default {
    components: {
      addPaciente
    },
    data() {
      return {
        pacientes: [],
        pacienteEdit: "",
        openModal: false,
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
        pacienteObj.isShow = true
      },
      salvarPassageiro(pacienteObj) {
        pacienteObj.isShow = false

        Axios.patch(`http://localhost:3000/pacientes/${pacienteObj.id}`, {...pacienteObj})
          .then(() => {
            alert('Sucesso em editar')
            window.location.reload()
          })
          .catch((err) => {
            alert('Erro ao editar')
            console.error(err)
          })
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
      },
      maskCpf($event) {
        return formatCPF($event.target.value)
      },
      maskCep($event) {
        return formatCep($event.target.value)
      },
      handleCNS($event) {
        return checkFormatCNS($event.target.value)
      }
    }
  }
</script>
