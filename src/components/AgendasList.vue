<template>
  <div>
    <div v-for="( { name }, index) in citiesList" :key="index" class="accordion-container">
      <div>
        <button @click="toggleAccordion(name)" class="accordion-trigger">
          <h2>
            {{ name }}
          </h2>
          <div>
            {{ accordionOpen === name ? 'x' : '+' }}
          </div>
        </button>
        <div v-show="accordionOpen === name" class="accordion-content">
          <form class="form" method="POST" @submit.prevent="submitForm"
            action="https://script.google.com/macros/s/AKfycbw70Ozj5ZKUIwIDpWnelsLjGbnj130UTj2etT31jxHL-ka8_tJS494U_FSW5QCrPnA2Rg/exec">
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
                    <input readonly type="text" id="cidade" name="cidade" :value="name" class="form-input form-readonly">
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
                <div class="form-col">
                  <label for="referencias" class="form-label">Referências</label>

                  <UploadWidget :leadName="form.name" :leadPhone="form.phone" />
                </div>

                <div class="form__description">
                  <div class="form-col">
                    <label for="descricao" class="form-label">Breve descrição</label>
                    <textarea id="descricao" name="descricao" v-model="form.description" class="form-input"></textarea>
                  </div>
                </div>
              </div>
            </div>

            <button @submit.prevent="submitForm" type="submit" class="form-submit">Enviar</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UploadWidget from '@/components/UploadWidget.vue';

export default {
  name: 'AgendasList',
  components: {
    UploadWidget
  },
  data() {
    return {
      accordionOpen: undefined,
      form: {
        phone: '',
        name: '',
        email: '',
        size: '',
        references: [],
        description: '',
      },
      citiesList: [
        {
          name: "Florianópolis",
          agendaOpen: true
        },
        {
          name: "São Paulo",
          agendaOpen: false
        },
        {
          name: "Rio de Janeiro",
          agendaOpen: true
        }
      ]
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
      const data = new FormData(e.target);
      const action = e.target.action;
      fetch(action, {
        method: 'POST',
        body: data,
      })
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

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
    padding: 0 60px;
    width: 100%;

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
}

.form {
  display: block;
  margin: 0 auto;
  padding: 0 60px 40px;

  &-wrapper {
    width: calc(100% - 20px);
    display: flex;
    flex-direction: column;

    @media screen and (min-width: 768px) {
      flex-direction: row;
      gap: 80px;
    }
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
}

textarea {
  resize: none;
  min-height: 98px;
}
</style>
