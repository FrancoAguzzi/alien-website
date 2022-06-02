<template>
  <div class="right-container">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import '../assets/scss/_colors.scss';
@import '../assets/scss/_buttons.scss';
@import '../assets/scss/_inputs.scss';

.s-perfil {
  margin-top: 5.5rem;
  padding-top: 4.5rem;
  padding-bottom: 7.625rem;
  background: url('../assets/img/bg-profile.png') no-repeat top right;
  .container {
    display: grid;
    grid-template-columns: 300px 1fr;
    grid-gap: 80px;
    align-items: flex-start;
  }
  .right-container {
    .title-area {
      margin-bottom: 3.5rem;
      h3 {
        margin-bottom: 0.5rem;
      }
      p {
        opacity: 0.7;
      }
    }
    .area-id {
      .box-user-profile {
        background: #0f1116;
        border-radius: 8px;
        overflow: hidden;
        .head {
          width: 100%;
          height: 174px;
          background: url('../assets/img/bg-id.png') no-repeat $dark-900 center right;
        }
        .info-geral {
          padding: 0px 70px 40px 70px;
          margin-top: -90px;
          .user {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            margin-bottom: 3.5rem;
            .left-container-user {
              display: flex;
              align-items: flex-end;
              .info-id-user {
                .tag {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  padding: 4px 8px;
                  max-width: 119px;
                  height: 25px;
                  background: rgba(32, 34, 39, 0.8);
                  backdrop-filter: blur(80px);
                  border-radius: 6px;
                  margin-bottom: 32px;
                  strong {
                    font-weight: bold;
                    font-size: 12px;
                    color: $dark-900;
                    margin-left: 0.375rem;
                  }
                }
                h3 {
                  margin-bottom: 0.45rem;
                }
                p {
                  font-size: 0.75rem;
                  line-height: 145%;
                  letter-spacing: -0.005em;
                  color: #ffffff;
                  opacity: 0.7;
                }
              }
              .photo {
                width: 220px;
                height: 220px;
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
                border-radius: 5px;
                margin-right: 40px;
                background-color: $gray-20;
                font-size: 10rem;
                background-size: cover;
                background-position: center;

                span {
                  color: $dark-600;
                  margin-top: 20px;
                }
              }
            }
            .right-container-user {
              position: relative;
              bottom: 30px;
              ul {
                display: flex;
                align-items: flex-start;
                li {
                  margin-left: 2rem;
                  &:first-child {
                    margin-left: 0;
                  }
                  span {
                    display: block;
                    font-weight: 600;
                    font-size: 0.75rem;
                    color: #ffffff;
                    opacity: 0.7;
                    margin-top: 0.625rem;
                  }
                }
              }
            }
          }
          .conquistas {
            .title-conquistas {
              display: flex;
              align-items: center;
              margin-bottom: 2rem;
              .icon {
                margin-right: 1rem;
              }
              h5 {
                font-weight: 600;
                font-size: 1.25rem;
                line-height: 115%;
                color: #ffffff;
                span {
                  color: $dark-100;
                }
              }
            }
            .area-slide-conquista {
              max-width: 710px;
              .slide-conquistas {
                height: 80px;
                overflow-x: scroll;
                overflow-y: hidden;
                white-space: nowrap;
                width: 100%;
                scrollbar-width: thin;
                scrollbar-color: transparent transparent;
                &::-webkit-scrollbar {
                  height: 0;
                }

                .card-conquista {
                  width: 70px !important;
                  height: 70px !important;
                  background: $dark-700;
                  border: 1px solid $dark-600;
                  border-radius: 6px;
                  display: inline-block;
                  cursor: pointer;
                  padding: 10px;
                  margin: 0 10px;

                  &:hover {
                    filter: brightness(0.8);
                  }
                }
              }
            }
          }
        }
      }
      .favorites {
        margin-top: 6rem;
        .top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2.5rem;
          .title-area {
            margin-bottom: 0;
          }
          a {
            display: flex;
            align-items: center;
            font-weight: 600;
            transition: color 0.3s;
            &:hover {
              color: $dark-900;
            }
            img {
              margin-left: 0.625rem;
            }
          }
        }
        .all {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 40px;
        }
      }
    }
    .box-dados-pessoais {
      padding: 4.5rem 4.375rem;
      background: #0f1116;
      border-radius: 8px;
      form {
        .user {
          display: flex;
          align-items: center;
          margin-bottom: 56px;
          .photo {
            width: 80px;
            height: 80px;
            border: 2px solid #202227;
            border-radius: 8px;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 1.875rem;
            font-size: 4rem;
            background-size: cover;
            background-position: center;
          }
          .info {
            cursor: pointer;
            .upload {
              width: 150px;
              position: relative;
              display: flex;
              align-items: center;
              margin-top: 8px;
              cursor: pointer;
              input[type='file'] {
                position: absolute;
                top: 0;
                left: 0;
                z-index: 0;
                opacity: 0;
                width: 150px;
                height: 100%;
                cursor: pointer;
              }
              span {
                font-size: 0.875rem;
                line-height: 145%;
                letter-spacing: -0.005em;
                color: #00e7f9;
                margin-left: 0.5rem;
                cursor: pointer;
              }
            }
          }
        }
        .item-form {
          margin-bottom: 56px;
          &:last-child {
            margin-bottom: 0;
            justify-content: flex-end;
            display: flex;
            button {
              max-width: 220px;
            }
          }
          .title-form {
            display: flex;
            align-items: center;
            margin-bottom: 1.5625rem;
            margin-bottom: 1.5rem;
            h4 {
              margin-left: 1rem;
            }
          }
          .form-double {
            grid-gap: 40px;
            margin-bottom: 2rem;
            &.end {
              grid-template-columns: 550px 1fr;
              .form-group {
                input[type='text'] {
                  max-width: 100%;
                }
              }
            }
            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
    }
    .box-content {
      padding: 4.5rem 4.375rem;
      background: #0f1116;
      border-radius: 8px;
      &.notifications {
        .item {
          padding-bottom: 56px;
          margin-bottom: 56px;
          border-bottom: 1.5px solid rgba(117, 119, 124, 0.3);
          &:last-child {
            border-bottom: 0;
            padding-bottom: 0;
          }
        }
      }
      .item {
        margin-bottom: 2.25rem;
        h6 {
          font-weight: 600;
          font-size: 1rem;
          line-height: 140%;
          text-transform: uppercase;
          color: #86888d;
          margin-bottom: 1.0625rem;
        }
      }
      .all-opt {
        display: flex;
        max-width: 644px;
        flex-wrap: wrap;
        .btn-radio {
          margin-right: 20px;
          margin-bottom: 20px;
        }
      }
      .btn-primary {
        max-width: 220px;
      }
    }
  }

  @media (max-width: 1200px) {
    .container {
      grid-template-columns: 28% 1fr;
      grid-gap: 5%;
    }
    .right-container {
      .box-dados-pessoais {
        padding: 4%;
        form {
          .item-form {
            .form-double {
              grid-gap: 20px;
              grid-template-columns: 1fr 1fr;
              margin-bottom: 20px;
              &.end {
                grid-template-columns: 1fr 1fr;
              }
            }
          }
        }
      }
      .box-content {
        padding: 6%;
      }
      .area-id {
        .box-user-profile {
          .info-geral {
            padding: 6%;
          }
        }
      }
    }
  }

  @media (max-width: 1000px) {
    .container {
      grid-template-columns: 1fr;
    }

    padding: 40px 0px;
    .right-container {
      .box-dados-pessoais {
        form {
          .item-form {
            .form-double {
              grid-template-columns: 1fr;
              &.end {
                grid-template-columns: 1fr;
              }
            }
          }
        }
      }
      .area-id {
        .box-user-profile {
          .head {
            height: 100px;
          }
          .info-geral {
            margin-top: -47px;
            .user {
              .left-container-user {
                .photo {
                  width: 180px;
                  height: 180px;
                  margin-right: 20px;
                }
                h2 {
                  font-size: 1.5rem;
                }
              }
              .right-container-user {
                ul {
                  flex-direction: column;
                  align-items: flex-start;
                  li {
                    margin-left: 0;
                    margin-top: 1.25rem;
                    &:first-child {
                      margin-top: 0;
                    }
                  }
                }
              }
            }
            .conquistas {
              .area-slide-conquista {
                max-width: 600px;
              }
            }
          }
        }
        .favorites {
          .all {
            grid-template-columns: 1fr;
          }
        }
      }
      .box-content {
        &.notifications {
          .item {
            padding-bottom: 20px;
            margin-bottom: 20px;
          }
        }
      }
    }
  }

  @media (max-width: 600px) {
    .container {
      grid-template-columns: 1fr;
    }
    .left-container {
      display: none;
    }
    .right-container {
      .title-area {
        margin-bottom: 2rem;
      }
      .area-id {
        .favorites {
          .all {
            .card-books {
              max-width: 100%;
              .image {
                img {
                  width: 100%;
                }
              }
            }
          }
        }
      }
    }
  }

  @media (max-width: 450px) {
    margin-top: 70px;
    .right-container {
      .box-dados-pessoais {
        form {
          .user {
            margin-bottom: 30px;
          }
          .item-form {
            margin-bottom: 20px;
            &:last-child {
              button {
                max-width: 100%;
              }
            }
          }
        }
      }
      .box-content {
        .item {
          margin-bottom: 10px;
        }
        .btn-primary {
          max-width: 100%;
        }
      }
      .area-id {
        .box-user-profile {
          .info-geral {
            .user {
              flex-direction: column;
              align-items: flex-start;
              .left-container-user {
                .photo {
                  width: 130px;
                  height: 130px;
                }
                h3 {
                  font-size: 0.9rem;
                }
                .info-id-user {
                  .tag {
                    margin-bottom: 10px;
                  }
                }
              }
              .right-container-user {
                bottom: 0;
                margin-top: 30px;
                ul {
                  flex-direction: row;
                  li {
                    margin-top: 0;
                    margin-left: 1.875rem;
                  }
                }
              }
            }
            .conquistas .area-slide-conquista {
              max-width: 320px;
              width: 100%;
            }
          }
        }
        .favorites {
          .top {
            .title-area {
              max-width: 70%;
            }
          }
        }
      }
    }
  }
}
</style>
