<template>
  <div class="content-add-paciente">
    <p>Adicionar Paciente</p>

    <form action="" id="formAddPaciente">
      <fieldset>
        <label for="">Nome completo</label>
        <input type="text" v-model="nome">
      </fieldset>
  
      <fieldset>
        <label for=""> Nome da mãe </label>
        <input type="text" v-model="nomeMae">
      </fieldset>
  
      <fieldset>
        <label for=""> Data de nascimento </label>
        <input type="date" v-model="dataNascimento">
      </fieldset>
  
      <fieldset>
        <label for="">CPF</label>
        <input type="text" v-model="CPF" @input="maskCpf" @focusout="getCPF">
      </fieldset>
  
      <fieldset>
        <label for="">CNS</label>
        <input type="text" v-model="CNS" @focusout="handleCNS">
      </fieldset>
  
      <div class="endereco"> Endereco</div>
      <fieldset>
        <label for="">CEP</label>
        <input type="text" v-model="cep" @focusout="getCEP" @focus="resetCep" @input="maskCep">
      </fieldset>
  
      <div v-if="isCepValid">
        <fieldset>
          <label for="">Rua</label>
          <input type="text" v-model="rua">
        </fieldset>
    
        <fieldset>
          <label for="">Numero</label>
          <input type="number" v-model="numero">
        </fieldset>
    
        <fieldset>
          <label for="">Bairro</label>
          <input type="text" v-model="bairro">
        </fieldset>
    
        <fieldset>
          <label for="">Cidade</label>
          <input type="text" v-model="cidade">
        </fieldset>
    
        <fieldset>
          <label for="">UF</label>
          <input type="text" v-model="uf">
        </fieldset>
    
        <fieldset>
          <label for="">Pais</label>
          <input type="text" v-model="pais">
        </fieldset>
      </div>
  
      <button :disable="!formValid" @click="criarPaciente($event)"> criar paciente </button>
    </form>
  </div>
</template>

<script>
  import Axios from 'axios';
  import './add-paciente.css'
  import { formatCPF, formatCep, checkFormatCNS } from '@/components/utils/utils';

  export default {
    props: ['pacienteEdit'],
    data() {
      return {
        nome: "",
        nomeMae: "",
        dataNascimento: "",
        CPF: "",
        CNS:"",
        rua: "",
        numero: "",
        bairro: "",
        uf: "",
        cidade: "",
        pais: "",
        cep: "",
        isCepValid: false
      }
    },
    methods: {
      formValid() {
        if (this.nome.trim() 
            && this.nomeMae.trim() 
            && this.dataNascimento.trim()
            && this.CPF.trim() 
            && this.CNS.trim()
            && this.rua.trim()
            && this.numero
            && this.bairro.trim()
            && this.uf.trim()
            && this.cidade.trim()
            && this.pais.trim()
            && this.cep.trim()) {
              return true
            }

        return false
      },
      getCEP() {
        if (!this.cep) {
          return
        }

        Axios.get(`https://viacep.com.br/ws/${this.cep}/json/`)
          .then((response) => {
            const { localidade, uf } = response.data

            this.cidade = localidade
            this.uf = uf
            this.isCepValid = true
          })
          .catch((err) => {
            alert('CPF incorreto!')
            console.error(err)
          })
      },
      resetCep() {
        this.isCepValid = false
        this.cep = ""
      },
      criarPaciente($event) {
        $event.preventDefault();
        
        if (!this.formValid()) {
          alert('Formulário inválido!')
          return
        }
        
        const headers = {
          "Content-Type": "application/json"
        }

        Axios.post('http://localhost:3000/pacientes/', {
          id: new Date().getTime(),
          nome: this.nome,
          nomeMae: this.nomeMae,
          dataNascimento: this.dataNascimento,
          CPF: this.CPF,
          CNS: this.CNS,
          rua: this.rua,
          numero: this.numero,
          bairro: this.bairro,
          uf: this.uf,
          cidade: this.cidade,
          pais: this.pais,
          cep: this.cep,
          isShow: false
        }, headers)
        .then(() => {
          this.resetForm()
          alert("Usuário cadastrado com sucesso!")
          window.location.reload()
        })
        .catch((err) => {
          console.error(err)
          alert("Erro ao cadastrar usuário!")
        })
      },
      resetForm() {
        this.nome = ""
        this.nomeMae =  "" 
        this.dataNascimento = ""
        this.CPF =  "" 
        this.CNS =  ""
        this.rua =  ""
        this.numero = ""
        this.bairro = ""
        this.uf = ""
        this.cidade = ""
        this.pais = ""
        this.cep =  ""
      },
      maskCpf($event) {
        this.CPF = formatCPF($event.target.value)
      },
      maskCep($event) {
        this.cep = formatCep($event.target.value)
      },
      handleCNS($event) {
        return checkFormatCNS($event.target.value)
      }
    }
  }
</script>
