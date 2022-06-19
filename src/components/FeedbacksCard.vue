<template>
  <li class="card carousel-cell" :style="{ backgroundImage: `url(${tattoo})` }">
    <div class="card__content">
      <a class="card__content-clientIg" :href="clientIg.link">{{ clientIg.label }}</a>
      <p class="card__content-clientName">{{ clientName }}</p>
      <div class="card__content-text">
        <p>{{ text }}</p>
      </div>
    </div>
    <div class="shadow-hover"></div>
  </li>
</template>

<script>
export default {
  name: 'FeedbacksCard',
  props: {
    tattoo: { type: String, required: true },
    clientIg: { type: String, required: false },
    clientName: { type: String, required: true },
    text: { type: String, required: true },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/variables.scss';

.card {
  display: inline-block;
  margin: 0 30px;
  position: relative;
  min-width: 375px;
  min-height: 630px;
  cursor: pointer;
  transition: all 0.3s;
  background-size: cover;
  background-position: left;
  background-repeat: no-repeat;
  overflow-y: hidden;

  &:first-child {
    &:before {
      content: 'Clique para ler o depoimento 👽';
      position: absolute;
      left: 10px;
      top: 10px;
      color: $white;
      font-family: 'Proxima Nova Light';
      font-size: 0.875rem;

      @media screen and (min-width: 1024px) {
        content: '';
      }
    }
  }

  &__content {
    max-width: 100%;
    padding: 32px 16px 14px;
    position: absolute;
    z-index: 20;
    bottom: -125px;
    background-image: linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.8) 20%);
    transition: all 0.3s;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &-clientIg {
      letter-spacing: -0.005em;
      color: $dark-900;
      opacity: 0.7;
      transition: opacity 0.3s;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      max-width: 100%;
      font: 600 20px/145% 'Proxima Nova Bold';
      margin: 0 0 10px;
    }

    &-clientName {
      display: block;
      font: 600 14px/145% 'Proxima Nova Semibold';
      letter-spacing: -0.005em;
      color: $dark-900;
      display: block;
      margin: 0 0 4px;
    }

    &-text {
      font-size: 1.125rem;
      line-height: 145%;
      letter-spacing: -0.005em;
      color: $dark-900;
      opacity: 0.7;
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: break-word;
      min-height: 60px;
      max-height: 60px;
      margin-top: 20px;
      font-family: 'Proxima Nova Regular';
      text-align: right;

      &:before {
        content: '';
        position: absolute;
        height: 2px;
        background-color: $dark-900;
        width: 275px;
        top: 103px;
        right: 0;
      }
    }
  }

  .shadow-hover {
    width: 100%;
    height: 100%;
    background-image: linear-gradient(180deg, transparent, #ffffff80);
    position: absolute;
    bottom: 0;
    left: 0;
    height: 0%;
    z-index: 1;
    transition: all 0.3s;
  }

  &:hover {
    .shadow-hover {
      height: 100%;
      display: block;
    }

    .card__content {
      bottom: 0;
      transition: all 0.3s;

      &-text {
        opacity: 1;
        max-height: unset;
      }
    }
  }
}
</style>
