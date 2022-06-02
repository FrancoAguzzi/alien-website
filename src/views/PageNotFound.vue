<template>
  <div>
    <section class="s-search">
      <div class="empty-results">
        <div class="txt">
          <h3>Erro 404</h3>
          <p>Página não encontrada</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
@import '../assets/scss/_colors.scss';
.s-search {
  margin-top: 88px;

  .empty-results {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10rem 0px;

    .txt {
      display: flex;
      flex-direction: column;
      align-items: center;

      h3 {
        margin-top: 3.5rem;
        margin-bottom: 0.5rem;
      }

      p {
        opacity: 0.7;
        margin-bottom: 2.5rem;
      }
    }
  }
}
</style>
