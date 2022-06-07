<template>
  <Modal :class="{ 'show-modal': isOpen }" id="js-modal-reportar-erro">
    <button @click="closeModal" type="button" class="close js-close-modal">
      <!-- <img src="@/assets/img/close.svg" alt="Botão que permite fechar o modal de report de bug" /> -->
    </button>

    <div class="icon">
      <img src="img/icon-report.svg" alt="" />
    </div>

    <h4>Reportar um erro</h4>

    <p>Algo deu errado? Conte pra gente o que ocorreu.</p>

    <form @submit.prevent="sendBugReport" autocomplete="off">
      <div class="form-group">
        <label for="">Erro</label>
        <input v-model="report.subject" type="text" placeholder="Digite o erro" />
      </div>
      <div class="form-group">
        <label for="">Mensagem</label>
        <textarea v-model="report.message" name="" id="bug" rows="4"></textarea>
      </div>
      <div class="form-group">
        <button type="submit" class="btn-primary">
          <LoaderBtn v-show="isSending" />
          Reportar
        </button>
      </div>
    </form>
  </Modal>

  <AlertToasty
    v-show="status.show"
    :message="status.message"
    :status="status.code"
    @closeModal="closeModal($event)"
  />
</template>

<script>
import http from '@/http';
import Modal from '@/components/Modal';
import LoaderBtn from '@/components/LoaderBtn';
import AlertToasty from '@/components/AlertToasty';

export default {
  name: 'BugReportModal',
  emits: ['closeModal'],
  components: { Modal, LoaderBtn, AlertToasty },
  props: {
    isOpen: { type: Boolean, required: false, default: false },
  },
  data() {
    return {
      isSending: false,
      report: { subject: null, message: null },
      status: { show: false, message: null, code: null },
    };
  },
  methods: {
    sendBugReport() {
      const invalidInputs = Object.keys(this.report).filter(
        (input) => this.report[input] === null || this.report[input] === ''
      );

      if (invalidInputs.length) {
        this.openToasty('Por favor, preencha todos os campos para reportar.', 500);
        return;
      }

      this.isSending = true;

      http
        .post('/support/create', {
          body: this.report.message,
          subject: this.report.subject,
        })
        .then((response) => {
          if (response.data.status) {
            this.report.subject = null;
            this.report.message = null;
            this.openToasty('Erro enviado com sucesso!', 200);
            this.closeModal();
          } else {
            this.openToasty('Tivemos um problema ao reportar. Por favor, tente mais tarde!', 500);
          }
        })
        .catch(() =>
          this.openToasty('Tivemos um problema ao reportar. Por favor, tente mais tarde!', 500)
        )
        .finally(() => (this.isSending = false));
    },
    closeModal() {
      this.$emit('closeModal', false);
    },
    openToasty(message, status) {
      this.status.show = true;
      this.status.message = message;
      this.status.code = status;
      this.clearErrorToasty();
    },
    clearErrorToasty() {
      setTimeout(() => {
        this.status.show = false;
        this.status.message = null;
        this.status.code = null;
      }, 3000);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/_colors.scss';
@import '../assets/scss/_inputs.scss';
</style>
