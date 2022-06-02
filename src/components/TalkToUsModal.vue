<template>
  <Modal :class="isOpen ? 'show-modal' : ''" :id="'js-modal-fale-conosco'">
    <button class="close js-close-modal" type="button" @click="closeModal">
      <img src="@/assets/img/close.svg" alt="" />
    </button>
    <div class="icon">
      <img src="img/icon-contato.svg" alt="" />
    </div>
    <h4>Fale conosco</h4>
    <p>Quer nos enviar alguma mensagem? Vamos conversar</p>

    <form @submit.prevent="talkToUsSubmit" autocomplete="off">
      <div class="form-group">
        <label for="">Assunto</label>
        <select v-model="form.subject">
          <option value="Plataforma">Plataforma</option>
          <option value="Financeiro">Financeiro</option>
          <option value="Conteúdo">Conteúdo</option>
          <option value="Cancelamento - Interno">
            Cancelamento
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="">Mensagem</label>
        <textarea v-model="form.message" name="" id="assunto" rows="4"></textarea>
      </div>
      <div class="form-group">
        <button class="btn-primary"><LoaderBtn v-show="loader" /> Enviar</button>
      </div>
    </form>
  </Modal>

  <AlertToasty
    v-show="status.show"
    @closeModal="closeModal($event)"
    :status="status.code"
    :message="status.message"
  />
</template>

<script>
import http from '@/http';
import Modal from '@/components/Modal';
import LoaderBtn from '@/components/LoaderBtn';
import AlertToasty from '@/components/AlertToasty';

export default {
  name: 'TalkToUsModal',
  emits: ['closeModal'],
  components: { AlertToasty, LoaderBtn, Modal },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        subject: null,
        message: null,
      },
      status: {
        message: null,
        code: null,
        show: false,
      },
      loader: false,
    };
  },
  methods: {
    talkToUsSubmit() {
      this.loader = true;
      const isCancellation = this.form.subject === 'Cancelamento - Interno';
      const inputs = Object.keys(this.form).filter(
        (input) => this.form[input] === null || this.form[input] === ''
      );

      if (inputs.length === 0) {
        http
          .post('/support/create', {
            body: this.form.message,
            subject: this.form.subject,
          })
          .then((response) => {
            if (response.data.status) {
              const successMsg = isCancellation
                ? 'Sua solicitação foi enviada com sucesso. Entraremos em contato em até 24h úteis.'
                : 'Sua dúvida foi enviada com sucesso!';

              this.form.subject = null;
              this.form.message = null;
              this.openToasty(true, successMsg, 200);
            }
          })
          .catch(() => {
            this.openToasty(
              true,
              'Ocorreu um erro inesperado! Por favor, entre em contato conosco através do e-mail suporte@finclass.com ou Whatsapp: (11) 4871-4353.',
              400
            );
          })
          .finally(() => {
            this.loader = false;
            this.closeModal();
          });
      } else {
        this.loader = false;
        this.openToasty(true, 'Por favor preencha todos os campos para enviar a sua dúvida.', 500);
      }
    },
    clearErrorToasty() {
      setTimeout(() => {
        this.status.show = false;
        this.status.message = null;
      }, 3000);
    },
    openToasty(show, message, status) {
      this.status.show = show;
      this.status.message = message;
      this.status.code = status;
      this.clearErrorToasty();
    },
    closeModal() {
      this.$emit('closeModal', false);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/_colors.scss';
@import '../assets/scss/_inputs.scss';
</style>
