export const KEEP_STORAGE_KEY = '[DNT]'; // DNT = Do Not Touch

export const uf = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
];

export const countries = [
  { value: 'Brazil', label: 'Brasil', icon: require('@/assets/img/brasil-area.svg') },
];

// DEIXAR COMO DEFAULT 12X

export const plans = [
  {
    planTitle: 'FINCLASS | 1X',
    planDescription: '(1x R$598,80 s/juros)',
    planPrice: 'R$598,80',
    planID: '2079177',
    trialDays: '0',
  },
  {
    planTitle: 'FINCLASS | 2X',
    planDescription: '(2x R$299,40 s/juros)',
    planPrice: 'R$598,80',
    planID: '2079176',
    trialDays: '0',
  },
  {
    planTitle: 'FINCLASS | 3X',
    planDescription: '(3x R$199,60 s/juros)',
    planPrice: 'R$598,80',
    planID: '2079175',
    trialDays: '0',
  },
  {
    planTitle: 'FINCLASS | 4X',
    planDescription: '(4x R$149,70 s/juros)',
    planPrice: 'R$598,80',
    planID: '2079174',
    trialDays: '0',
  },
  {
    planTitle: 'FINCLASS | 5X',
    planDescription: '(5x R$119,76 s/juros)',
    planPrice: 'R$598,80',
    planID: '2079173',
    trialDays: '0',
  },
  {
    planTitle: 'FINCLASS | 6X',
    planDescription: '(6x R$99,80 s/juros)',
    planPrice: 'R$598,80',
    planID: '2079172',
    trialDays: '0',
  },
  {
    planTitle: 'FINCLASS | 7X',
    planDescription: '(7x R$85,40 s/juros)',
    planPrice: 'R$598,80',
    planID: '2079171',
    trialDays: '0',
  },
  {
    planTitle: 'FINCLASS | 8X',
    planDescription: '(8x R$74,85 s/juros)',
    planPrice: 'R$598,80',
    planID: '2079169',
    trialDays: '0',
  },
  {
    planTitle: 'FINCLASS | 9X',
    planDescription: '(9x R$66,53 s/juros)',
    planPrice: 'R$598,80',
    planID: '2079167',
    trialDays: '0',
  },
  {
    planTitle: 'FINCLASS | 10X',
    planDescription: '(10x R$59,88 s/juros)',
    planPrice: 'R$598,80',
    planID: '2079165',
    trialDays: '0',
  },
  {
    planTitle: 'FINCLASS | 11X',
    planDescription: '(11x R$54,44 s/juros)',
    planPrice: 'R$598,80',
    planID: '2079164',
    trialDays: '0',
  },
  {
    planTitle: 'FINCLASS | 12X',
    planDescription: '(12x R$49,90 s/juros)',
    planPrice: 'R$598,80',
    planID: '2079163',
    trialDays: '0',
  },
];

export const promoModalInfo = {
  promoId: `${KEEP_STORAGE_KEY}vr-cripto-t2`,
  showModal: false,
  mainImage: {
    landscape:
      'https://content.finclass.com/finclasses/promo_modal/area_logada/vr-cripto-t2-landscape.png',
    mobile:
      'https://content.finclass.com/finclasses/promo_modal/area_logada/vr-cripto-t2-mobile.png',
    tablet:
      'https://content.finclass.com/finclasses/promo_modal/area_logada/vr-cripto-t2-tablet.png',
    desktop:
      'https://content.finclass.com/finclasses/promo_modal/area_logada/vr-cripto-t2-desktop.png',
  },
  title: 'DESCONTO PARA ALUNOS',
  subtitle: {
    show: false,
    text: '',
  },
  description:
    'Salve seu dinheiro da próxima crise financeira global - enquanto acelera seus ganhos hoje - no único mercado "a prova de governos" do mundo: as criptomoedas.',
  priceImage: {
    landscape:
      'https://content.finclass.com/finclasses/promo_modal/area_logada/valores/vr-cripto-t2-landscape.svg',
    mobile:
      'https://content.finclass.com/finclasses/promo_modal/area_logada/valores/vr-cripto-t2-mobile.svg',
    tablet:
      'https://content.finclass.com/finclasses/promo_modal/area_logada/valores/vr-cripto-t2-tablet.svg',
    alt: 'Preço - Viver de Renda Cripto',
  },
  ctaLabel: 'QUERO GARANTIR MINHA VAGA!',
  ctaBgColor: '#F2A900',
  ctaColor: '#402D01',
  ctaLink: '/order?pmp=LAN-VIN-SBAN-VRC_T2-BFIN-20220322-ORG-BP_VRC_T2_MAR2022-HOT-BANNER_Finclass',
  ctaTargetBlank: false,
  founder: {
    priceImage: {
      landscape:
        'https://content.finclass.com/finclasses/promo_modal/area_logada/valores/vr-cripto-t2-landscape-founder.svg',
      mobile:
        'https://content.finclass.com/finclasses/promo_modal/area_logada/valores/vr-cripto-t2-mobile-founder.svg',
      tablet:
        'https://content.finclass.com/finclasses/promo_modal/area_logada/valores/vr-cripto-t2-tablet-founder.svg',
      alt: 'Preço para Founders - Viver de Renda Cripto',
    },
    ctaLabel: 'QUERO GARANTIR MINHA VAGA!',
    ctaLink:
      '/order?pmp=LAN-VIN-SBAN-VRC_T2-BFIN-20220322-ORG-BP_VRC_T2_MAR2022-HOT-BANNER_Finclass',
    discount: '500,00',
  },
  landscapeLogo: {
    src: 'https://content.finclass.com/finclasses/promo_modal/area_logada/vr-cripto-t2-logo.svg',
    alt: 'Viver de Renda Cripto - Logo',
  },
};

export const dynamicPromoModalInfo = {
  promoId: `${KEEP_STORAGE_KEY}lifetime-may-22`,
  isActive: true,
  isLifetimeModal: true,
  isLongImage: false,
  modalBgColor: '#000',
  noShowMoreColor: '#FFF',
  founder: {
    mainImage: {
      landscape:
        'https://content.finclass.com/finclasses/promo_modal/area_logada/lifetime-may22-landscape--founder.jpg',
      mobile:
        'https://content.finclass.com/finclasses/promo_modal/area_logada/lifetime-may22-mobile--founder.jpg',
      tablet:
        'https://content.finclass.com/finclasses/promo_modal/area_logada/lifetime-may22-tablet--founder.jpg',
      desktop:
        'https://content.finclass.com/finclasses/promo_modal/area_logada/lifetime-may22-desktop--founder.jpg',
    },
    title: {
      text: 'Pague uma vez, acesse PRA SEMPRE!',
      baseColor: '#39D0FF',
      highlightColor: '',
      fontFamily: 'Proxima Nova Bold',
    },
    subtitle: {
      text: 'Faça o Upgrade da sua assinatura e se torne membro vitalício Finclass.',
      color: '#FFF',
      highlightColor: '#FFF',
      fontFamily: 'Proxima Nova Regular',
    },
    description: {
      text:
        'Acesso ao Clube de Vantagens, TODOS os conteúdos sem data pra acabar e você <b>na lista VIP</b> em eventos especiais!',
      color: '#FFF',
    },
    cta: {
      label: 'QUERO SER VITALÍCIO',
      link: '/lifetime',
      hasTargetBlank: false,
      backgroundColor: '#39D0FF',
      textColor: '#000',
    },
  },
  lifetime: {
    mainImage: {
      landscape:
        'https://content.finclass.com/finclasses/promo_modal/area_logada/lifetime-may22-landscape.png',
      mobile:
        'https://content.finclass.com/finclasses/promo_modal/area_logada/lifetime-may22-mobile.png',
      tablet:
        'https://content.finclass.com/finclasses/promo_modal/area_logada/lifetime-may22-tablet.png',
      desktop:
        'https://content.finclass.com/finclasses/promo_modal/area_logada/lifetime-may22-desktop.png',
    },
    title: {
      text: 'Pague uma vez, acesse PRA SEMPRE!',
      baseColor: '#39D0FF',
      highlightColor: '',
      fontFamily: 'Proxima Nova Bold',
    },
    subtitle: {
      text: 'Faça o Upgrade da sua assinatura e se torne membro vitalício Finclass.',
      color: '#FFF',
      highlightColor: '#FFF',
      fontFamily: 'Proxima Nova Regular',
    },
    description: {
      text:
        'Acesso ao Clube de Vantagens, TODOS os conteúdos sem data pra acabar e você <b>na lista VIP</b> em eventos especiais!',
      color: '#FFF',
    },
    cta: {
      label: 'QUERO SER VITALÍCIO',
      link: '/lifetime',
      hasTargetBlank: true,
      backgroundColor: '#39D0FF',
      textColor: '#000',
    },
  },
  member: {
    mainImage: {
      landscape:
        'https://content.finclass.com/finclasses/promo_modal/area_logada/lifetime-may22-landscape.png',
      mobile:
        'https://content.finclass.com/finclasses/promo_modal/area_logada/lifetime-may22-mobile.png',
      tablet:
        'https://content.finclass.com/finclasses/promo_modal/area_logada/lifetime-may22-tablet.png',
      desktop:
        'https://content.finclass.com/finclasses/promo_modal/area_logada/lifetime-may22-desktop.png',
    },
    title: {
      text: 'Pague uma vez, acesse PRA SEMPRE!',
      baseColor: '#39D0FF',
      highlightColor: '',
      fontFamily: 'Proxima Nova Bold',
    },
    subtitle: {
      text: 'Faça o Upgrade da sua assinatura e se torne membro vitalício Finclass.',
      color: '#FFF',
      highlightColor: '#FFF',
      fontFamily: 'Proxima Nova Regular',
    },
    description: {
      text:
        'Acesso ao Clube de Vantagens, TODOS os conteúdos sem data pra acabar e você <b>na lista VIP</b> em eventos especiais!',
      color: '#FFF',
    },
    cta: {
      label: 'QUERO SER VITALÍCIO',
      link: '/lifetime',
      hasTargetBlank: false,
      backgroundColor: '#39D0FF',
      textColor: '#000',
    },
  },
};

export const finclubDenounceMotives = [
  {
    name: 'SEXUAL_CONTENT',
    label: 'Conteúdo Sexual',
  },
  {
    name: 'MARKET_INFORMATION',
    label: 'Informações de mercado',
  },
  {
    name: 'ILLEGAL_SERVICES',
    label: 'Serviços ilegais',
  },
  {
    name: 'FAKE_NEWS',
    label: 'Informações falsas',
  },
  {
    name: 'OFENCES',
    label: 'Delito',
  },
  {
    name: 'POLITICS',
    label: 'Política',
  },
  {
    name: 'OTHERS',
    label: 'Outros',
  },
];

export const finclubReactions = [
  {
    name: 'HEART',
    action: 'Amei',
    img: {
      src: 'heart.svg',
      alt: 'Amei - Reação por Emoji',
    },
  },
  {
    name: 'COIN',
    action: 'Crypto',
    img: {
      src: 'coin.svg',
      alt: 'Crypto - Reação por Emoji',
    },
  },
  {
    name: 'BULL',
    action: 'Otimista',
    img: {
      src: 'bull.svg',
      alt: 'Otimista - Reação por Emoji',
    },
  },
  {
    name: 'ROCKET',
    action: 'Decola',
    img: {
      src: 'rocket.svg',
      alt: 'Decola - Reação por Emoji',
    },
  },
  {
    name: 'TARGET',
    action: 'Certeiro',
    img: {
      src: 'target.svg',
      alt: 'Certeiro - Reação por Emoji',
    },
  },
  {
    name: 'BEAR',
    action: 'Pessimista',
    img: {
      src: 'bear.svg',
      alt: 'Pessimista - Reação por Emoji',
    },
  },
];

export const finclubInitialStaticTopic = {
  topicKind: 'text',
  topicGuard: 'approved',
  topicGuardDetails: '',
  topicID: 'eae51109-d0b2-4938-b4ae-9346292bb50e',
  topicPriority: 'normal',
  topicTitle: 'Como investir melhor??!',
  topicBody: `Quando a Finclass nasceu, ela nasceu com uma grande missão:

Ensinar para todas as pessoas o caminho da liberdade.

E quando falamos em liberdade...

Falamos da liberdade de ir em qualquer restaurante que você quiser... sem precisar se preocupar com a conta. Da liberdade de construir patrimônio para viver bem no futuro, ao invés de ser um eterno escravo do presente.
E liberdade de ter uma vida resumida a sonhos conquistados, e não de boletos não pagos.

Vivemos num país onde pelo menos 88% dos brasileiros investem mal (em poupança), 58% têm contas atrasadas, 62 milhões têm nome negativado e apenas 1% conseguem manter seu padrão de vida após aposentadoria.

Essa realidade só mudará quando tornarmos o conhecimento acessível.

Quando você aceitou fazer parte da Finclass... você aceitou compartilhar da nossa missão.

Por isso a nossa comunidade, além de ser um lugar para interagirmos e nos conhecermos, é também um lugar para trocarmos conhecimento e é o quartel general do nosso movimento.

Seja legal. Tenha humildade. Respeite o próximo, e não tenha medo de perguntar e responder.

Somos todos parte de um movimento a favor da educação financeira.

“O conhecimento torna a alma jovem e diminui a amargura da velhice. Colhe, pois, a sabedoria. Armazena suavidade para o amanhã.”

Leonardo da Vinci`,
  reactCount: 0,
  commentsCount: 0,
  topicReacts: {
    LIKE: 0,
    HEART: 0,
    THUMBSUP: 0,
    TARGET: 0,
    ROCKET: 0,
    COIN: 0,
    BULL: 0,
    BEAR: 0,
  },
  topicReplys: [],
  topicViewCount: 0,
  topicTags: [],
  createdBy: {
    userID: '82345578-a136-4ce4-9af4-31f8a56cce6b',
    userFirstname: 'Finclass',
    userLastname: '- Oficial',
    userEmail: 'tecnologia@timeprimo.com',
    userPhoto: 'https://content.finclass.com/Logos/Logo-finclass_positivo.png',
    updatedAt: 1648923694,
  },
  createdAt: 1649949519,
  updatedAt: 1649949519,
  isFirstTopic: true,
};

export const automaticRenewalBenefits = [
  {
    title: 'Valor atual',
    description:
      'Enquanto a sua assinatura estiver ativa, você fica protegido dos reajustes anuais que os novos alunos terão.',
  },
  {
    title: 'Descontos exclusivos',
    description:
      'Os alunos têm descontos exclusivos em diversos produtos do Grupo Primo. Ex: Imersões presenciais e formações.',
  },
  {
    title: 'Comunidade',
    description:
      'Garanta o acesso a comunidade mais engajada do Brasil. Você pode tirar dúvidas e fazer network.',
  },
];

export const thirdPartiesExplanationData = {
  ios: {
    REVERSAL: {
      iconName: 'mysignature/icon-reversal.svg',
      title: 'Como eu faço para solicitar estorno na App Store?',
      subtitle: 'Para solicitar estorno, você deve seguir os seguintes passos:',
      steps: [
        'Acesse reportaproblem.apple.com.',
        'Inicie sessão com seu ID Apple e senha.',
        'Toque ou clique em "Eu gostaria de…".',
        'Selecione "Solicitar um estorno".',
        'Escolha o motivo pelo qual você deseja um estorno e escolha Seguinte.',
        'Selecione o item ou os itens que você comprou e escolha Enviar.',
      ],
    },
    ACTIVATE_RENEWAL: {
      iconName: 'icon-repeat-filled.svg',
      title: 'Como eu faço para ativar a renovação na App Store?',
      subtitle: 'Para ativar a renovação da sua assinatura, você deve seguir os seguintes passos:',
      steps: [
        'Vá para as configurações do seu aparelho',
        'Selecione seu nome',
        'Selecione “Assinaturas”',
        'Selecione “Finclass”',
        'Selecione uma opção para assinar novamente.',
      ],
    },
    DISABLE_RENEWAL: {
      iconName: 'icon-repeat-filled-cancel.svg',
      title: 'Como eu faço para desativar a renovação na App Store?',
      subtitle:
        'Para desativar a renovação da sua assinatura, você deve seguir os seguintes passos:',
      steps: [
        'Vá para as configurações do seu aparelho',
        'Selecione seu nome',
        'Selecione “Assinaturas”',
        'Selecione “Finclass”',
        'Clique em cancelar e sua assinatura não será renovada no final do período de vigência do seu plano',
      ],
    },
  },
  claro: {
    REVERSAL: null,
    ACTIVATE_RENEWAL: {
      iconName: 'icon-repeat-filled.svg',
      title: 'O gerenciamento de sua assinatura é realizado no ambiente da Claro.',
      subtitle:
        'Para reativar sua assinatura, você deve acessar o aplicativo Claro Móvel ou entrar em contato com o atendimento da Claro.',
      steps: [],
    },
    DISABLE_RENEWAL: {
      iconName: 'icon-repeat-filled-cancel.svg',
      title: 'Como eu faço para desativar a renovação na Claro?',
      subtitle:
        'Para desativar a renovação da sua assinatura, você deve seguir os seguintes passos:',
      steps: ['Entrando em contato com a operadora.', 'Através do seu aplicativo Claro.'],
    },
  },
};

export const reasonsForCancel = [
  'Dificuldades técnicas',
  'Quero suspender minha conta',
  'Terminei o conteúdo pelo qual tinha assinado',
  'Eu pretendo trocar por outro serviço de vídeo',
  'Não correspondeu às minhas expectativas',
  'Muito caro / não posso mais pagar',
  'Problemas na cobrança / suporte ',
  'Outros',
];
