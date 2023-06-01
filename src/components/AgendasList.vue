<template>
  <div>
    <div v-for="( { name: cityName }, index) in citiesList" :key="index" class="accordion-container">
      <div>
        <button @click="toggleAccordion(cityName)" class="accordion-trigger">
          <h2>
            {{ cityName }}
          </h2>
          <div :class="accordionOpen === cityName ? 'close-icon' : 'open-icon'">
            {{ accordionOpen === cityName ? 'x' : '+' }}
          </div>
        </button>
        <div v-show="accordionOpen === cityName" class="accordion-content">
          <form v-if="currentStep === 1" class="form" method="POST" @submit.prevent="submitForm"
            action="https://script.google.com/macros/s/AKfycbzFN7fwppoquz9SwCcdgKxiOb1eLaIli9ZUKcMliJL7MjeHnfic9UChrODMrSaetdxJkw/exec">
            <div class="form-wrapper">
              <div class="form-col form__firstCol">
                <div class="form-row">
                  <div class="form-col form__firstElement">
                    <label for="nome" class="form-label">Nome*</label>
                    <input id="nome" v-model="form.name" type="text" name="nome" required class="form-input">
                  </div>
                  <div class="form-col">
                    <label for="telefone" class="form-label">Whatsapp*</label>
                    <input id="telefone" v-model="form.phone" name="telefone" type="tel" v-mask="'(##) #####-####'"
                      required class="form-input">
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-col form__firstElement">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" id="email" name="email" v-model="form.email" class="form-input">
                  </div>
                  <div class="form-col">
                    <label for="cidade" class="form-label">Cidade</label>
                    <input readonly type="text" id="cidade" name="cidade" :value="cityName"
                      class="form-input form-readonly">
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-col">
                    <label for="tamanho_tattoo" class="form-label">Tamanho da tatuagem, em centímetros</label>
                    <input type="number" id="tamanho_tattoo" name="tamanho_tattoo" v-model="form.size" class="form-input">
                  </div>
                </div>
              </div>

              <div class="form__secondCol">
                <div class="form__description">
                  <div class="form-col">
                    <label for="descricao" class="form-label">Breve descrição da ideia</label>
                    <textarea id="descricao" name="descricao" v-model="form.description" class="form-input"></textarea>
                  </div>
                  <button @submit.prevent="submitForm" type="submit" class="form-submit">
                    {{ loadingFormSubmit ? 'Enviando dados...' : 'Enviar' }}
                  </button>
                </div>
              </div>
            </div>
          </form>
          <div v-else class="form-col form-second-step">
            <h2>Ficamos felizes em receber o seu contato 👽</h2>
            <h4>Nesta etapa você poderá submeter valiosas referências para o desenvolvimento de
              sua ideia:</h4>

            <UploadWidget :leadName="form.name" :leadPhone="form.phone" :city="cityName" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UploadWidget from '@/components/UploadWidget.vue';
import { citiesList } from '../utils';

export default {
  name: 'AgendasList',
  components: {
    UploadWidget
  },
  data() {
    return {
      loadingFormSubmit: false,
      accordionOpen: undefined,
      currentStep: 1,
      form: {
        phone: '',
        name: '',
        email: '',
        size: '',
        references: [],
        description: '',
      },
      citiesList
    };
  },
  methods: {
    handleFileUpload(event) {
      this.form.references = [...event.target.files];
    },
    toggleAccordion(name) {
      if (this.accordionOpen === name) {
        this.accordionOpen = undefined;
      } else {
        this.accordionOpen = name;
      }
    },
    submitForm(e) {
      this.loadingFormSubmit = true
      const data = new FormData(e.target);
      const action = e.target.action;
      const headers = new Headers({
        'Access-Control-Allow-Origin': '*'
      })
      fetch(action, {
        method: 'POST',
        mode: 'no-cors',
        body: data,
        headers,
      }).then(() => {
        this.currentStep = 2;
      }).finally(() => {
        this.loadingFormSubmit = false
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.close-icon {
  font-family: 'Arial';
  color: $dark-50;
  transition: all .4s;

  &:hover {
    color: $dark-900;
    transition: all .4s;
  }

  @media screen and (min-width: 768px) {
    margin-right: 16px;

  }
}

@media screen and (min-width: 768px) {
  .open-icon {
    margin-right: 16px;
  }

}


.accordion {
  &-trigger {
    background-color: transparent;
    padding: 12px 20px;
    border-radius: 8px;
    border: none;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    margin-left: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
    width: 100%;


    @media screen and (min-width: 768px) {
      padding: 0 60px;
    }

    >div {
      font-size: 28px;
    }
  }


  &-container {
    border: 2px solid black;
    background-color: $white;

    &:last-child {
      border-bottom: 3px solid $dark-900;
    }
  }

  &-content {
    box-sizing: border-box;
    width: 100%;
    max-width: 100vw;
  }
}

.form {
  display: block;
  margin: 0 auto;
  padding: 0 20px 20px;

  @media screen and (min-width: 768px) {
    padding: 0 60px 40px;

    &-wrapper {
      flex-direction: row;
      gap: 40px;
    }
  }

  &-wrapper {
    width: calc(100% - 20px);
    display: flex;
    flex-direction: column;

  }

  &-row {
    display: flex;
  }

  &-col {
    display: flex;
    text-align: left;
    flex-direction: column;
    width: 100%;
  }

  &__firstElement {
    margin-right: 40px;
  }

  &-label {
    padding-bottom: 10px;
    padding-top: 24px;
  }

  &-input {
    box-sizing: border-box;
    padding: 10px;
    border: 2px solid $dark-900;
    border-radius: 5px;
    width: 100%;
  }

  &-readonly {
    background-color: $dark-10;
    border-color: $dark-50;
  }

  &__secondCol {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;

    >* {
      flex-grow: 1;
    }
  }

  &__description {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &>* {
      width: 100%;
    }
  }

  &-submit {
    background-color: $dark-900;
    color: $white;
    padding: 18px 24px;
    border-radius: 8px;
    border: none;
    font-size: 20px;
    font-weight: 500;
    margin: 24px 0 0;
    width: 100%;

    &:hover {
      background-color: $dark-600;
      transition: all 0.2s ease-in-out;
      cursor: pointer;
    }
  }

  &-second-step {
    margin: 0 40px 40px;
    max-width: 80vw;

    @media screen and (min-width: 768px) {
      margin: 0 60px 60px;

    }

    h4 {
      margin-top: 0;
    }
  }
}

textarea {
  resize: none;
  min-height: 98px;
}
</style>
