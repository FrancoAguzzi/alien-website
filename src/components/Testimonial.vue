<template>
  <section id="testimonial">
    <div class="container">
      <div class="title">
        <img
          src="@/assets/img/icon-testimonial.svg"
          rel="preload"
          alt="Testimonial"
          height="32"
          width="32"
        />
        <h2><span>O que</span> estão dizendo sobre a Finclass</h2>
      </div>
      <div class="testi-content">
        <div class="user">
          <div class="user-card" :class="{ active: index === 0 }">
            <img src="@/assets/img/testimonial/testimonial1.webp" rel="preload" alt="Testimonial" />
            <div class="wrap-text">
              <strong>Leticia Fagundes</strong>
              <p>Empreendedora - Curitiba</p>
            </div>
          </div>
          <div class="user-card" :class="{ active: index === 1 }">
            <img src="@/assets/img/testimonial/testimonial2.webp" rel="preload" alt="Testimonial" />
            <div class="wrap-text">
              <strong>Sara Rodrigues</strong>
              <p>Gestora de Processos - São Paulo</p>
            </div>
          </div>
          <div class="user-card" :class="{ active: index === 2 }">
            <img src="@/assets/img/testimonial/testimonial3.webp" rel="preload" alt="Testimonial" />
            <div class="wrap-text">
              <strong>Paulo Junqueira</strong>
              <p>Gestor de Processos - São Paulo</p>
            </div>
          </div>
        </div>
        <div class="control">
          <button type="button" class="up" @click="switchTestimonial(-1)">
            <img src="@/assets/img/arrow-circle-down.svg" alt="Anterior" />
          </button>
          <button type="button" @click="switchTestimonial(+1)">
            <img src="@/assets/img/arrow-circle-down.svg" alt="Próximo" />
          </button>
        </div>
        <div class="testi-text">
          <ul>
            <li :class="{ active: index === 0 }">
              <strong>A finclass mudou minha vida</strong>
              <ul>
                <li>
                  <img src="@/assets/img/testimonial/star.svg" rel="preload" alt="star" />
                  <img src="@/assets/img/testimonial/star.svg" rel="preload" alt="star" />
                  <img src="@/assets/img/testimonial/star.svg" rel="preload" alt="star" />
                  <img src="@/assets/img/testimonial/star.svg" rel="preload" alt="star" />
                  <img src="@/assets/img/testimonial/star.svg" rel="preload" alt="star" />
                </li>
              </ul>
              <img
                src="@/assets/img/testimonial/quote.svg"
                rel="preload"
                class="quote"
                alt="Quote"
              />
              <p>
                A Finclass veio para revolucionar tudo o que já vimos no mercado financeiro. A
                oportunidade de ter tanta gente incrível e de tão alto nível na palma da minha mão
                me traz liberdade, muita bagagem enquanto eu estou aprendendo.
                <br /><br />
                Na Finclass está tudo organizado e “mastigado” para gente. Recomendo de olhos
                fechados, é a coisa mais incrível que eu já vi na internet. É literalmente uma
                Netflix dos investimentos - só que melhor!
              </p>
            </li>
            <li :class="{ active: index === 1 }">
              <strong>Os maiores mentores de finanças do mundo!</strong>
              <ul>
                <li>
                  <img src="@/assets/img/testimonial/star.svg" rel="preload" alt="star" />
                  <img src="@/assets/img/testimonial/star.svg" rel="preload" alt="star" />
                  <img src="@/assets/img/testimonial/star.svg" rel="preload" alt="star" />
                  <img src="@/assets/img/testimonial/star.svg" rel="preload" alt="star" />
                  <img src="@/assets/img/testimonial/star.svg" rel="preload" alt="star" />
                </li>
              </ul>
              <img
                src="@/assets/img/testimonial/quote.svg"
                rel="preload"
                class="quote"
                alt="Quote"
              />
              <p>
                A Finclass é muito completa, desde aulas, documentários e livros! Com os maiores
                mentores de finanças do mundo! Jeito leve de aprender finanças e realmente mudar de
                vida, aumentando a nossa famosa bola de neve e sair da corrida dos ratos e fazer o
                seu dinheiro trabalhar por nós! Uma maneira de aprender um pouco todos os dias sem
                ser cansativo, dentro da minha rotina! A finclass é excepcional!
              </p>
            </li>
            <li :class="{ active: index === 2 }">
              <strong>Jeito leve de aprender finanças </strong>
              <ul>
                <li>
                  <img src="@/assets/img/testimonial/star.svg" rel="preload" alt="star" />
                  <img src="@/assets/img/testimonial/star.svg" rel="preload" alt="star" />
                  <img src="@/assets/img/testimonial/star.svg" rel="preload" alt="star" />
                  <img src="@/assets/img/testimonial/star.svg" rel="preload" alt="star" />
                  <img src="@/assets/img/testimonial/star.svg" rel="preload" alt="star" />
                </li>
              </ul>
              <img
                src="@/assets/img/testimonial/quote.svg"
                rel="preload"
                class="quote"
                alt="Quote"
              />
              <p>
                A plataforma tem um conceito incrível: incluir diversos temas relacionados a
                finanças em um mesmo lugar (aulas, documentários, livros, etc.).
                <br /><br />
                As autoridades sobre os temas, até o momento, estão ótimas (Braga sobre vieses,
                Giambiagi sobre finanças públicas e Breno Perrucho sobre o início dos
                investimentos). A plataforma está fácil de mexer, bem intuitiva e com um design
                muito bonito.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Testimonial',
  data() {
    return {
      index: 0,
    };
  },
  methods: {
    switchTestimonial(value) {
      if (this.index + value > 2) {
        this.index = 0;
      } else if (this.index + value < 0) {
        this.index = 2;
      } else {
        this.index += value;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/_colors.scss';

#testimonial {
  margin-top: 2rem;

  .container {
    width: 80rem;
    margin: auto;

    .title {
      img {
        width: 2rem;
        height: 2rem;
        margin-bottom: 0.5rem;
      }

      h2 {
        width: 25rem;
        font-size: 2.5rem;

        span {
          color: $dark-100;
        }
      }
    }

    .testi-content {
      display: grid;
      grid-template-columns: 25rem 3rem 38.75rem;
      gap: 0 6.25rem;
      align-items: center;
      margin-top: 3.5rem;

      .user {
        .user-card {
          height: 7rem;
          margin-bottom: 1.5rem;
          background-color: $dark-800;
          opacity: 0.5;
          display: flex;
          align-items: center;
          border-radius: 8px;

          &.active {
            opacity: 1;
            transition: all ease-in-out 0.5s;
          }

          img {
            width: 4.5rem;
            height: 4.5rem;
            margin: 1.25rem 2rem;
            border-radius: 2.25rem;
          }

          .wrap-text {
            strong {
              color: $dark-900;
            }

            p {
              font-size: 0.875rem;
              line-height: 145%;
            }
          }
        }
      }

      .control {
        button {
          &.up {
            transform: rotate(180deg);
          }

          img {
            width: 3rem;
            height: 3rem;
            margin: 0.5rem 0;
          }
        }
      }

      .testi-text {
        border-radius: 1rem;
        background-color: $dark-800;
        padding: 2.5rem 3rem;

        ul {
          li {
            height: 0;
            opacity: 0;

            &.active {
              transition: all ease-in-out 0.5s;
              opacity: 1;
              height: auto;
            }

            strong {
              font-size: 1.25rem;
              font-weight: 600;
              line-height: 145%;
            }

            ul {
              margin-top: 0.625rem;

              li {
                display: inline-block;
                opacity: unset;

                img {
                  width: 1rem;
                  height: 1rem;
                  margin-right: 0.375rem;
                  display: inline-block;
                }
              }
            }

            .quote {
              width: 1.5rem;
              height: 1.5rem;
              margin-top: 2.375rem;
            }

            p {
              margin-top: 1.75rem;
              line-height: 145%;
            }
          }
        }
      }
    }
  }

  @media (min-width: 768px) and (max-width: 1279px) {
    .container {
      width: 100%;

      .title {
        h2 {
          width: 19rem;
          font-size: 2rem;
          line-height: 2.25rem;
        }
      }

      .testi-content {
        grid-template-columns: 1fr 1.5fr;
        gap: 0 1.5rem;
        align-items: unset;
        grid-template-areas:
          'column-2 column-2'
          'column-1 column-3';

        .user {
          grid-area: column-1;

          .user-card {
            img {
              width: 4rem;
              height: 4rem;
              margin: 1rem;
            }

            .wrap-text {
              p {
                width: 8.125rem;
              }
            }
          }
        }

        .control {
          grid-area: column-2;
          padding: 5px;
          display: flex;
          align-items: center;
          justify-content: flex-end;

          button {
            margin-left: 1.25rem;

            img {
              transform: rotate(270deg);
            }
          }
        }

        .testi-text {
          grid-area: column-3;
          border-radius: 1rem;

          ul {
            li {
              .quote {
                margin-top: 1.5rem;
              }

              p {
                margin-top: 0.75rem;
              }
            }
          }
        }
      }
    }
  }

  @media (max-width: 767px) {
    margin-top: 4.5rem;

    .container {
      width: 100%;

      .title {
        h2 {
          width: 18.25rem;
          font-size: 1.75rem;
          line-height: 2rem;
        }
      }

      .testi-content {
        grid-template-columns: 1fr;
        gap: 0;
        grid-template-areas:
          'column-3'
          'column-1'
          'column-2';

        .user {
          grid-area: column-1;

          .user-card {
            height: 0;
            margin-bottom: 0;
            border-radius: 0 0 1rem 1rem;
            overflow-y: hidden;

            &.active {
              height: unset;
            }

            img {
              margin: 1.25rem 1rem 1.25rem 1.5rem;
            }
          }
        }

        .control {
          grid-area: column-2;
          display: flex;
          justify-content: flex-end;
          margin-top: 2rem;

          button {
            img {
              margin: 0 0 0 0.75rem;
              transform: rotate(-90deg);
            }
          }
        }

        .testi-text {
          grid-area: column-3;
          border-radius: 1rem 1rem 0 0;
          padding: 1.5rem;

          ul {
            li {
              overflow-y: hidden;

              ul {
                li {
                  height: unset;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
