<template>
  <TitlePages
    :title="'Meus favoritos'"
    :icon="require('@/assets/img/icon-favorites-star.svg')"
    :subtitle="''"
  />
  <section class="s-favoritos">
    <div class="container">
      <div class="top">
        <h3>Mais recentes</h3>
        <div class="filter">
          <div>
            <span>Ordernar por:</span>
            <button class="js-select-filter">
              <span>Mais recentes</span> <img src="img/arrow-down-outline.svg" alt="" />
            </button>
          </div>
          <ul class="drop">
            <li>
              <a href="" class="js-opt-filter">
                <img src="img/icon-alta.svg" alt="" />
                <span>Em alta</span>
              </a>
            </li>
            <li>
              <a href="" class="js-opt-filter">
                <img src="img/icon-recentes.svg" alt="" />
                <span>Mais recentes</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="all">
        <div class="card-docs" v-for="(card, index) in 6" :key="index">
          <div class="image">
            <img src="@/assets/img/img-docs-01.jpg" alt="" />
          </div>
          <div class="info">
            <h4>Influência da COVID no cenário macroeconômico brasileiro</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit....</p>
          </div>
          <div class="geral-info">
            <h4>Influência da COVID no cenário macroeconômico brasileiro</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit....</p>
            <div class="actions">
              <a href="" class="btn-details">
                <div class="icon"></div>
                detalhes
              </a>
              <button class="btn-favorites js-btn-favorite"></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import TitlePages from '@/components/TitlePages';
export default {
  name: 'Favorites',
  components: {
    TitlePages,
  },
};
</script>
<style>
.s-favoritos {
  padding-top: 72px;
  padding-bottom: 128px;
}
.s-favoritos .top {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  margin-bottom: 2rem;
}
.s-favoritos .top h3 {
  color: #86888d;
}
.s-favoritos .all {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 40px;
}
</style>
