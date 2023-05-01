<template>
  <form>
    <fieldset>
      <label for="email">E=mail</label>
      <input name="email" id="email" v-model="email" placeholder="Digite seu e-mail" @focusout="validarEmail"/>
    </fieldset>
    <fieldset>
      <label for="password">Password</label>
      <input name="senha" id="password" v-model="password" placeholder="Digite sua senha" @focusout="validarPassword"/>
    </fieldset>

    <button id="btn-login" @click="logar($event)" :disabled="formValid">Entrar</button>
  </form>

  <p v-if="failedSubmit">Erro ao logar. Tentar novamente mais tarde!</p>
</template>

<script>
  import './login-comp.css'
  import { validEmail } from '../utils/utils'
  import Axios from 'axios'

  export default {
    data() {
      return {
        email: '',
        password: '',
        isEmailValid: false,
        isPasswordValidLength: false,
        failedSubmit: false
      }
    },
    methods: {
      logar(event) {
        event.preventDefault();
        
        Axios.get(`http://localhost:3000/usuarios/${this.email}`)
          .then((response) => {
            if(response.data.password === this.password) {
              this.$router.push({ path: 'pacientes' })
            }
          })
          .catch((err) => {
            alert('Erro no login!')
            console.error(err)
          })
      },
      validarEmail() {
        const isvalid = validEmail(this.email)
        
        this.isEmailValid = isvalid && this.email != ''
      },
      validarPassword() {
        const sizePassword = this.password.length > 8

        this.isPasswordValidLength = sizePassword && this.password != ''
      }
    },
    computed: {
      formValid() {
        return !(this.isEmailValid && this.isPasswordValidLength) 
      }
    }
  }
</script>
