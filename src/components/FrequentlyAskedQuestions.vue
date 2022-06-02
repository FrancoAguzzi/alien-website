<template>
  <section id="faq">
    <div class="container">
      <img
        src="@/assets/img/faq/faq.svg"
        rel="preload"
        class="title-image"
        alt="Perguntas frequentes"
        height="32"
        width="32"
      />
      <h2>Perguntas <span>frequentes</span></h2>
      <nav v-if="!showLifetimeQuestions">
        <button type="button" :class="{ active: index === 0 }" @click="switchFaq(0)">
          <img src="@/assets/img/faq/general.svg" rel="preload" :alt="tabTitles.tab1" />
          {{ tabTitles.tab1 }}
        </button>
        <button type="button" :class="{ active: index === 1 }" @click="switchFaq(1)">
          <img src="@/assets/img/faq/mobile.svg" rel="preload" :alt="tabTitles.tab2" />
          {{ tabTitles.tab2 }}
        </button>
        <button type="button" :class="{ active: index === 2 }" @click="switchFaq(2)">
          <img src="@/assets/img/faq/card.svg" rel="preload" :alt="tabTitles.tab3" />
          <span>{{ tabTitles.tab3 }}</span>
          <span>{{ tabTitles.tab3 }}</span>
        </button>
      </nav>
      <ul>
        <li class="faq-content" :class="{ active: index === 0 }">
          <template v-if="showLifetimeQuestions">
            <faq-item question="Quando a minha badge de membro vitalício estará disponível?">
              Ela será adicionada à sua conta na seção “conquistas” em até 30 dias após a compra.
            </faq-item>
            <faq-item question="Quando começa a valer o meu período vitalício?">
              O plano vitalício inicia a partir do fim da sua assinatura atual. Por exemplo, se a
              sua assinatura atual é válida até dia 13/04, o período do vitalício inicia a partir do
              dia 14/04 para você.
            </faq-item>
            <faq-item question="Como saber quando meu plano atual vai terminar?">
              Você pode consultar o seu período válido atual através do menu: Meu perfil >
              Assinaturas > Valido até
            </faq-item>
            <faq-item question="Quando começa a cobrança do plano vitalício?">
              O valor único do plano vitalício será cobrado na sua próxima fatura de acordo com a
              forma de pagamento escolhida, bem como o número de parcelas.
            </faq-item>
            <faq-item question="Assinei a Finclass pela Apple Store. O que fazer? ">
              Caso você tenha assinatura ativa pela Apple Store é importante efetuar o cancelamento
              da cobrança automática. Para isso, você deve os seguintes passos: <br /><br />
              <ol>
                <li>1. Vá para as configurações do seu aparelho</li>
                <li>2. Selecione seu nome</li>
                <li>3. Selecione “Assinaturas”</li>
                <li>4. Selecione “Finclass”</li>
                <li>
                  5. Clique em cancelar e sua assinatura não será renovada no final do período de
                  vigência do seu plano
                </li>
              </ol>
            </faq-item>
            <faq-item
              question="Tenho mais dúvidas sobre a assinatura vitalícia, com quem posso falar?"
            >
              Entre em contato com nosso time de atendimento via e-mail
              <a href="mailto:suporte@finclass.com" rel="noopener" style="display: inline-block">
                suporte@finclass.com
              </a>
              ou Whatsapp:
              <a
                href="https://api.whatsapp.com/send?phone=+551148714353"
                rel="noopener"
                style="display: inline-block"
              >
                (11) 4871-4353
              </a>
              .
            </faq-item>
          </template>

          <div v-if="!showLifetimeQuestions">
            <template v-if="showOrderQuestions">
              <faq-item question="Quanto tempo de acesso ao curso?">
                Seu tempo de acesso é de 12 meses
              </faq-item>
              <faq-item question="O curso funciona mesmo que eu não saiba NADA sobre criptomoedas?">
                Sim, funciona. Todo o conteúdo é construído para ir do básico ao avançado.
              </faq-item>
              <faq-item question="Qual a duração média das aulas?">
                Serão 8 aulas ao vivo. Cada aula tem entre 2 e 4 horas de duração.
              </faq-item>
              <faq-item question="Tem certificado?">
                Sim, ao final do curso você poderá desbloquear o seu certificado.
              </faq-item>
              <faq-item question="Posso acessar de um aplicativo?">
                Sim, poderá acessar todos os conteúdos gravados a partir do app Sparkle.
              </faq-item>
              <faq-item question="Quais os dias e horários das aulas?">
                Sempre aos domingos, 9h da manhã. Todas as aulas ficarão gravadas!
              </faq-item>
              <faq-item question="O curso Viver de Renda Cripto possui comunidade?">
                Sim, possui no Facebook, lá dentro teremos monitores qualificados para tirar 100%
                das dúvidas postadas. A média de resposta é de 24h.
              </faq-item>
              <faq-item
                question="Comprei na primeira hora e ganhei um NFT, como funciona o recebimento?"
              >
                Para que nós possamos te enviar sua NFT, você precisa já ter uma conta na MetaMask
                criada. Caso não tenha, ou nem faça ideia do que seja isso, fique tranquilo(a),
                dentro do curso você vai aprender como fazer isso! <br /><br />
                O prazo para você nos enviar seus dados é de 6 meses após a data da compra. Nós te
                enviaremos um formulário por email e também no grupo de alunos. <br /><br />
                O prazo para o envio do NFT para sua MetaMask é de 3 meses.
              </faq-item>
              <faq-item question="Todos os alunos irão ganhar o NFT?">
                Somente quem realizar a inscrição até as 7:10 do dia 28/03, limitando a distribuição
                até 4 mil NFTs.
              </faq-item>
            </template>
            <template v-else>
              <faq-item question="Quais finclasses são certas para mim?">
                Na Finclass você encontrará trilhas de aprendizagem e questionários para nivelar o
                seu conhecimento, e dessa forma oferecermos o melhor conteúdo para você. Cada trilha
                foi projetada para ser acessível a pessoas iniciantes no assunto e também a alunos
                avançados. Com o lançamento regular de novas aulas, você terá sempre a oportunidade
                de aprender algo novo.
              </faq-item>
              <faq-item question="Como acesso minha conta?">
                Acesse
                <a
                  href="https://app.finclass.com/login"
                  rel="noopener"
                  style="display: inline-block"
                >
                  app.finclass.com
                </a>
                e preencha os dados de login que você utilizou em seu cadastro.
              </faq-item>
              <faq-item question="Por quanto tempo tenho acesso ao conteúdo?">
                O conteúdo estará disponível durante todo o período que sua assinatura for vigente,
                durante 24 horas por dia de forma ilimitada.
              </faq-item>
            </template>
          </div>
        </li>
        <li v-if="!showLifetimeQuestions" class="faq-content" :class="{ active: index === 1 }">
          <template v-if="showOrderQuestions">
            <faq-item question="Se eu tiver dúvidas, como eu faço?">
              Pode mandar sua dúvida dentro da comunidade do Viver de Renda Cripto que um dos nossos
              monitores qualificados vão te responder detalhadamente.
            </faq-item>
            <faq-item question="O certificado do curso é chancelado por qual instituição?">
              O PRIMO RICO
            </faq-item>
            <faq-item question="Quanto tempo eu tenho de garantia?">
              Se dentro de 7 dias após o primeiro encontro do Viver de Renda Cripto você perceber
              que não faz sentido continuar, você pode pedir o reembolso.
            </faq-item>
            <faq-item question="Emite alguma nota fiscal?">
              Sim, ao final do curso você poderá desbloquear o seu certificado.
            </faq-item>
            <faq-item question="Comprei duas vezes, o que faço?">
              Mande um e-mail para
              <a href="mailto:suporte@finclass.com" rel="noopener" style="display: inline-block">
                contato@vocemaisrico.com.br
              </a>
              e solicite o reembolso das parcelas adicionais.
            </faq-item>
            <faq-item question="Posso compartilhar o meu acesso?">
              Não. O sistema identifica o acesso e, se identificar dois acessos de 2 IPs diferentes
              de forma simultânea, você pode ser bloqueado pela plataforma.
            </faq-item>
          </template>
          <template v-else>
            <faq-item question="Como eu faço para desconectar do App?">
              <p>1. Selecione o botão “Menu” na barra inferior</p>
              <p>2. Vá até o final da página e clique no botão “Sair”</p>
            </faq-item>
            <faq-item question="Onde no App eu encontro a lista de conteúdos que estou assistindo?">
              <p>1. Selecione o botão “Menu” na barra inferior</p>
              <p>2. Selecione “Meu progresso”</p>
            </faq-item>
            <faq-item question="Eu acabei de baixar meu aplicativo e não consigo ver os conteúdos">
              Por favor verifique se você está logado na sua conta Finclass. Caso você esteja
              devidamente logado e não estiver conseguindo ver o conteúdo, por favor entre em
              contato conosco através do e-mail
              <a href="mailto:suporte@finclass.com" rel="noopener" style="display: inline-block">
                suporte@finclass.com
              </a>
              ou Whatsapp:
              <a
                href="https://api.whatsapp.com/send?phone=+551148714353"
                rel="noopener"
                style="display: inline-block"
              >
                (11) 4871-4353
              </a>
              .
            </faq-item>
            <faq-item question="Qual versão do Android eu preciso para usar o App?">
              O App é atualmente otimizado para a versão Android 5.0 ou superior.
            </faq-item>
            <faq-item question="Qual versão do IOS eu preciso para usar o App?">
              O App é atualmente otimizado para a versão IOS12 ou superior.
            </faq-item>
            <faq-item question="Posso utilizar o app no meu iPad?">
              Neste primeiro momento, ainda não temos uma versão para iPad.
            </faq-item>
          </template>
        </li>
        <li v-if="!showLifetimeQuestions" class="faq-content" :class="{ active: index === 2 }">
          <template v-if="showOrderQuestions">
            <faq-item question="Quais são as formas de pagamento?">
              Pagando com cartão de crédito você recebe acesso imediato a área de membros. Por PIX,
              alguns minutos após fazer o pagamento. Boleto pode levar até 72 horas para ser
              identificado pelo nosso sistema.
            </faq-item>
            <faq-item question="Qual é o investimento para entrar no Viver de Renda Cripto?">
              12x de R$291,99 ou R$2997 a vista. Para cada escolha de parcelamento, existe um
              cálculo de juros diferente.
            </faq-item>
            <faq-item question="Não tenho limite disponível, como posso comprar?">
              Existe uma função de "parcelamento inteligente" ativada no carrinho de compras, caso
              você não tenha limite, essa função será ativada automaticamente.
            </faq-item>
            <faq-item question="Posso comprar com dois cartões?">
              Sim, no carrinho de compras essa opção estará habilitada.
            </faq-item>
            <faq-item question="Alunos de outros cursos e assinaturas do Grupo Primo têm desconto?">
              Alunos Finclass, Staage e Paradigma têm <strong>500 reais</strong> de desconto. Alunos
              dos cursos do Thiago Nigro, do Bruno Perini e do Joel tem <strong>R$1000</strong> de
              desconto. Todos são por meio de link único que será enviado por email.
            </faq-item>
          </template>
          <template v-else>
            <faq-item question="Qual o prazo de garantia da Finclass?">
              Na Finclass temos compromisso com nossos assinantes, dessa forma, oferecemos 7 dias de
              garantia, à partir da data de pagamento da assinatura, para a desistência e devolução
              integral do valor pago pelo assinante.
            </faq-item>
            <faq-item question="Como funciona a renovação da assinatura?">
              A renovação da sua assinatura é automática e ocorre sempre após 12 meses da
              confirmação do primeiro pagamento. Você receberá em seu e-mail um lembrete informando
              sobre a renovação. No momento da renovação da assinatura a garantia de 7 dias também é
              renovada e, se desejar, nesse momento você poderá cancelar a assinatura. Lembramos na
              renovação da assinatura, caso você realize o pagamento de forma parcelada, no primeiro
              mês da renovação, o valor total da anuidade será comprometido do seu limite, mas
              apenas o valor da parcela deverá ser pago. O prazo de reembolso/estorno pode variar de
              acordo com a operadora do seu cartão.
            </faq-item>
            <faq-item question="Como funciona a garantia de 7 dias e reembolso?">
              Segundo o artigo 49 do Código de Defesa do Consumidor, o consumidor poderá desistir de
              sua compra no período de até 07 dias corridos e ter os valores pagos reembolsados no
              ato da renovação de ciclo de assinatura (anual), a garantia de 7 dias também é
              renovada. Então caso se arrependa de ter assinado dentro do prazo de 7 dias da
              contratação ou renovação da anuidade, você pode solicitar o cancelamento com direito
              ao reembolso da mensalidade que foi cobrada.
            </faq-item>
            <faq-item
              question="Quanto de limite preciso ter no meu cartão para realizar a assinatura?"
            >
              Você precisa ter de limite em seu cartão o valor total da anuidade e no primeiro mês o
              valor total da anuidade será comprometido. Mas fique tranquilo você só será cobrado o
              valor da parcela. Por isso, não se assuste caso receba um SMS a notificação de sua
              operadora, informado uma compra com o valor total, esse é apenas o valor comprometido
              em sua fatura.
            </faq-item>
            <faq-item question="Como posso pagar minha assinatura?">
              <p>Sua assinatura pode ser paga via cartão de crédito exclusivamente.</p>
              <p>Não é possível realizar pagamentos via boleto ou com cartão de débito.</p>
            </faq-item>
            <faq-item question="Posso pagar com um cartão internacional?">
              Sim, a plataforma permite que você realize o pagamento de sua assinatura em até 12x
              sem juros. Mas fique atento porque, a maioria dos cartões internacionais não permitem
              parcelamento. Nesse caso, para concretizar sua assinatura, é necessário que a forma de
              pagamento selecionada seja à vista (1 parcela)
            </faq-item>
            <faq-item question="Como faço para cancelar minha assinatura?">
              Se não quiser continuar, você pode cancelar a renovação da sua associação por meio da
              página da sua conta. Siga as instruções para cancelar e sua assinatura não será
              renovada. Não há reembolso para períodos de assinatura parcialmente não utilizados.
            </faq-item>
          </template>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import FaqItem from '@/components/FaqItem.vue';

export default {
  name: 'FrequentlyAskedQuestions',
  components: { FaqItem },
  props: {
    showLifetimeQuestions: {
      type: Boolean,
      default: false,
    },
    showOrderQuestions: {
      type: Boolean,
      default: false,
    },
    tabTitles: {
      type: Object,
      required: false,
      default() {
        return { tab1: 'Geral', tab2: 'Aplicativo', tab3: 'Assinatura' };
      },
    },
  },
  data() {
    return {
      index: 0,
    };
  },
  methods: {
    switchFaq(value) {
      this.index = value;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/_colors.scss';

#faq {
  margin: 6.875rem auto 0;

  .container {
    width: 80rem;
    padding: 0 1rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .title-image {
      width: 2rem;
      height: 2rem;
      margin: 0 0 1.25rem 0;
    }

    h2 {
      font-size: 2.5rem;
      font-weight: bold;
      margin-bottom: 4.5rem;

      span {
        color: $dark-100;
      }
    }

    nav {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      width: 46.25rem;
      margin: 0 auto 4rem;

      button {
        display: flex;
        align-items: center;
        justify-content: center;
        color: $white;
        padding: 1.5rem 0;
        opacity: 0.5;
        border-bottom: 1px solid $dark-700;
        font-size: 1.125rem;

        &.active {
          opacity: 1;
          border-bottom: 1px solid $dark-900;
        }

        img {
          width: 1.5rem;
          height: 1.5rem;
          margin-right: 1rem;
        }

        :nth-child(2) {
          display: block;
          font-family: 'ProximaNova-Semibold', sans-serif;
        }

        :nth-child(3) {
          display: none;
          font-family: 'ProximaNova-Semibold', sans-serif;
        }
      }
    }

    ul {
      width: 46.25rem;

      .faq-content {
        display: none;

        &.active {
          display: block;
        }
      }
    }
  }

  @media (min-width: 768px) and (max-width: 1279px) {
    margin: 2.5rem auto 0 auto;
    width: 100%;

    .container {
      width: 100%;
      margin: auto;
      text-align: center;
      padding: 2.5rem 0;

      .title-image {
        margin: 0 0 0.75rem 0;
      }

      nav {
        width: 100%;
      }
    }
  }

  @media (min-width: 471px) and (max-width: 767px) {
    width: 100%;

    .container {
      width: 100%;
      padding: 0;

      h2 {
        margin-bottom: 3rem;
      }

      nav {
        width: 100%;
        margin: 0 auto 2rem auto;

        button {
          :nth-child(2) {
            display: none;
          }

          :nth-child(3) {
            display: block;
          }
        }
      }

      ul {
        width: 100%;
      }
    }
  }

  @media (max-width: 470px) {
    margin: 2.5rem auto 0 auto;
    width: 100%;

    .container {
      width: 100%;

      .title-image {
        margin: 0 0 0.75rem 0;
      }

      h2 {
        font-size: 1.5rem;
        text-align: center;
        width: 100%;
        margin-bottom: 3rem;
      }

      nav {
        width: 100%;
        margin: 0 auto 2rem auto;

        button {
          flex-direction: column;
          font-size: 0.875rem;

          img {
            margin-right: unset;
            margin-bottom: 0.5rem;
          }

          :nth-child(2) {
            display: none;
          }

          :nth-child(3) {
            display: block;
          }
        }
      }

      ul {
        width: 100%;
      }
    }
  }
}
</style>
