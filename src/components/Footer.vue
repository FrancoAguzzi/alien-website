<template>
  <footer id="main-footer">
    <div class="container">
      <main>
        <div>
          <img src="@/assets/img/logo.svg" alt="" />
        </div>
        <nav>
          <div>
            <h5>Conteúdos</h5>
            <ul>
              <li><router-link to="/finclasses">Finclasses</router-link></li>
              <li><router-link to="/finseries">Finseries</router-link></li>
              <li><router-link to="/finbooks">Finbooks</router-link></li>
            </ul>
          </div>
          <div>
            <h5>Links úteis</h5>
            <ul>
              <li><router-link to="/policy/1" target="_blank">Termos de Uso</router-link></li>
              <li>
                <router-link to="/policy/7" target="_blank">Política de Privacidade</router-link>
              </li>
            </ul>
          </div>
          <div>
            <h5>Redes sociais</h5>
            <ul>
              <li>
                <a href="https://www.instagram.com/finclass_grupoprimo/" target="_blank">
                  <div class="icon">
                    <img src="@/assets/img/instagram.svg" alt="" />
                  </div>
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/channel/UCeOEK9nZbdAw65WxPbXOZ0w" target="_blank">
                  <div class="icon">
                    <img src="@/assets/img/youtube.svg" alt="" />
                  </div>
                  <span>Youtube</span>
                </a>
              </li>
              <!-- <li>
                <a href="">
                  <div class="icon">
                    <img src="@/assets/img/facebook.svg" alt="">
                  </div>
                  <span>Facebook</span>
                </a>
              </li>
              <li>
                <a href="">
                  <div class="icon">
                    <img src="@/assets/img/twitter.svg" alt="">
                  </div>
                  <span>Twitter</span>
                </a>
              </li>
              <li>
                <a href="">
                  <div class="icon">
                    <img src="@/assets/img/youtube.svg" alt="">
                  </div>
                  <span>Youtube</span>
                </a>
              </li> -->
            </ul>
          </div>
          <div>
            <h5>Fale conosco</h5>
            <ul>
              <li><a @click="navigate()">Central de ajuda</a></li>
              <li><a href="mailto:privacy@finclass.com">Fale com o DPO</a></li>
              <li><a @click="navigate()">Contato</a></li>
              <li><a @click="navigate()">FAQ</a></li>
            </ul>
          </div>
        </nav>
      </main>
      <div class="copyright">
        <p>2022 © Todos os direitos reservados. Finclass</p>
        <div class="pointer" @click="scrollTop">
          <span>Voltar para o topo</span>
          <a id="js-button-scroll-top">
            <img src="@/assets/img/icon-down.svg" alt="" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  methods: {
    navigate() {
      window.scrollTo(0, 0);
      this.$router.push({ path: '/help-center' });
    },
    scrollTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  },
};
</script>

<style lang="scss">
@import '../assets/scss/_colors.scss';

footer {
  background: $dark-800;
  padding-top: 73px;
  padding-bottom: 32px;
  z-index: 101;
  position: relative;

  main {
    display: flex;
    align-items: flex-start;
    > div {
      > div {
        margin-top: 6.125rem;
        width: 32px;
        height: 2px;
        background: #86888d;
        border-radius: 6px 6px 0px 0px;
        margin-bottom: 1.5rem;
      }
      p {
        font-size: 1rem;
        line-height: 145%;
        letter-spacing: -0.005em;
        color: #ffffff;
        max-width: 192px;
      }
    }
    nav {
      flex: 1;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-left: 6.5rem;
      > div {
        h5 {
          font-weight: bold;
          line-height: 100%;
          margin-bottom: 1rem;
        }
        ul {
          li {
            margin-bottom: 1.25rem;
            font-weight: 600;
            cursor: pointer;
            a {
              opacity: 0.7;
              display: flex;
              align-items: center;
              &:hover {
                opacity: 1;
              }
              .icon {
                width: 16px;
                display: flex;
                justify-content: center;
                margin-right: 0.8125rem;
              }
            }
          }
        }
        &:nth-child(3) {
          ul {
            li {
              a {
                opacity: 1;
                span {
                  opacity: 0.7;
                }
                &:hover {
                  span {
                    opacity: 1;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .copyright {
    border-top: 2px solid #202227;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 2rem;
    margin-top: 4.875rem;
    > div {
      display: flex;
      align-items: center;
      span {
        font-weight: 600;
        font-size: 1rem;
        line-height: 115%;
        letter-spacing: -0.005em;
        color: #ffffff;
        margin-right: 1.5rem;
      }
      a {
        &:hover {
          transform: scale(1.05);
        }
      }
    }
  }
  @media (max-width: 1200px) {
    main {
      nav {
        margin-left: 2.5rem;
      }
    }
  }
  @media (max-width: 991px) {
    main {
      flex-direction: column;
      align-items: center;
      > div {
        margin-bottom: 40px;
        > div {
          margin: 30px auto;
        }
        p {
          text-align: center;
        }
      }
      nav {
        margin-left: 0;
        width: 100%;
      }
    }
  }
  @media (max-width: 600px) {
    main {
      nav {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px;
        > div {
          h5 {
            text-align: center;
          }
          ul {
            li {
              a {
                display: flex;
                align-items: center;
                justify-content: center;
              }
            }
          }
        }
      }
    }
  }
  @media (max-width: 450px) {
    padding-top: 40px;
    padding-bottom: 20px;
    main {
      align-items: flex-start;
      > div {
        p {
          text-align: left;
        }
        > div {
          margin: 25px 0px;
        }
      }
      nav {
        > div {
          h5 {
            text-align: left;
          }
          ul {
            li {
              a {
                justify-content: flex-start;
              }
            }
          }
        }
      }
    }
    .copyright {
      margin-top: 1rem;
      p {
        max-width: 200px;
      }
      > div {
        span {
          display: none;
        }
      }
    }
  }
}
.pointer {
  cursor: pointer;
}
</style>
