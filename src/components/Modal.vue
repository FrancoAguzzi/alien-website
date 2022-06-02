<template>
  <div class="modal" :id="id">
    <div class="overlay"></div>
    <div class="modal-body" :class="classes">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id', 'classes'],
};
</script>

<style lang="scss">
@import '../assets/scss/_colors.scss';
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2021;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
  &#js-modal-fale-conosco,
  &#js-modal-reportar-erro {
    .modal-body {
      width: 624px;
    }
  }
  &.show-modal {
    opacity: 1;
    pointer-events: all;
    .modal-body {
      transform: translateY(0px);
    }
  }
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    background: rgba(32, 34, 39, 0.8);
    backdrop-filter: blur(32px);
  }
  .modal-body {
    position: relative;
    z-index: 1;
    background: #101113;
    border-radius: 6px;
    padding: 2vh 2vw;
    max-width: 471px;
    transform: translateY(20px);
    transition: transform 0.3s;
    &.large {
      width: 60vw;
      max-width: 60vw;
    }
    &.small {
      width: 25vw;
      max-width: 25vw;
    }
    .close {
      position: absolute;
      top: 32px;
      right: 32px;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: $dark-700;
    }
    .icon {
      margin-bottom: 1.5rem;
    }
    h4 {
      margin-bottom: 8px;
      span {
        display: block;
        opacity: 0.7;
      }
    }
    p {
      opacity: 0.7;
      strong {
        display: block;
      }
    }
    .pedido {
      margin: 32px 0px;
      background: #0f1116;
      border: 1px solid #172026;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1.5rem 0px;
      strong {
        display: block;
        font-weight: 600;
        font-size: 1rem;
        line-height: 140%;
        text-transform: uppercase;
        color: #86888d;
        margin-bottom: 0.375rem;
      }
      h3 {
        font-size: 1.25rem;
        font-weight: bold;
      }
    }
    .btn-primary {
      max-width: 100%;
      height: 56px;
    }
    form {
      margin-top: 2.5rem;
      input,
      textarea {
        max-width: 100%;
      }
      button.btn-primary {
        max-width: 220px;
        height: 48px;
      }
    }
    h5 {
      font-weight: bold;
      font-size: 1rem;
      line-height: 115%;
      letter-spacing: -0.005em;
      color: #ffffff;
      opacity: 0.7;
      margin-bottom: 1rem;
      margin-top: 2.5rem;
    }
    ul {
      margin-bottom: 2.5rem;
      li {
        margin-bottom: 24px;
        padding-bottom: 24px;
        border-bottom: 1.5px solid #75777c;
        display: flex;
        align-items: flex-start;
        &:before {
          content: '';
          display: inline-block;
          width: 5px;
          height: 5px;
          background: #00e7f9;
          border-radius: 50%;
          margin-right: 1rem;
          margin-top: 9px;
        }
        p {
          flex: 1;
          font-size: 1rem;
          line-height: 145%;
          letter-spacing: -0.005em;
          color: #ffffff;
          opacity: 0.7;
        }
        &:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border: none;
        }
      }
    }
    .btn-primary {
      max-width: 220px;
    }
  }
  @media (max-width: 450px) {
    top: 20px;
    .modal-body {
      padding: 20px;
      max-width: 95%;
      &.large {
        width: 95vw;
        max-width: 95vw;
      }
      &.small {
        width: 85vw;
        max-width: 85vw;
      }
      form {
        margin-top: 1.5rem;
      }
      .btn-primary {
        max-width: 100%;
      }
    }
  }
}
</style>
