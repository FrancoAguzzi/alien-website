<template>
  <div>
    <TitlePages
      :title="'Política de privacidade'"
      :icon="require('@/assets/img/icon-politica.svg')"
      :subtitle="'Conheça mais detalhes da nossa política e condições de uso'"
    />

    <section class="s-politica">
      <div class="s-politica-wrapper">
        <ul class="s-politica-wrapper__menu">
          <li>
            <span id="one" class="anchor-position"></span>
            <a @click="toggleMobileSection(1)" :class="{ active: index === 1 }">
              <div class="s-politica-wrapper_ellipse" :class="{ active: index === 1 }"></div>
              1. DEFINIÇÕES DOS TERMOS UTILIZADOS NESTE CONTRATO
              <img src="@/assets/img/arrow-down-gray.svg" alt="Seta para baixo" />
            </a>
            <div class="mobile-txt" :class="index === 1 ? 'show' : ''">
              <h3>Bem-vindo ao Finclass</h3>
              <span id="one" class="anchor-position"></span>
              <p>
                A plataforma da FINCLASS, de propriedade da empresa O PRIMO RICO MÍDIA, EDUCACIONAL
                E PARTICIPAÇÕES LTDA, pessoa jurídica inscrita no CNPJ/ME sob o nº
                35.784.233/0001-07, com sede na Avenida Copacabana, 325, sala 201, Barueri-SP, CEP
                06472-001, tem o prazer de oferecer-lhe os seus serviços/produtos através deste
                Contrato de Assinatura, que regula o uso da plataforma FINCLASS. Ao acessar o site,
                você concorda com os termos deste contrato. Por isso, é importante que você o leia
                com muita atenção.
              </p>
              <h3>1. DEFINIÇÕES DOS TERMOS UTILIZADOS NESTE CONTRATO:</h3>
              <p><strong>1.1. </strong>Para fins destes Termos de Uso, definem:</p>
              <p>
                <strong>1.1.1. </strong>Contrato ou Contrato de Assinatura: o presente contrato de
                prestação de serviços/produtos de streaming no nicho de educação financeira;
              </p>
              <p>
                <strong>1.1.2. </strong>O Primo Rico: a empresa O PRIMO RICO, MÍDIA, EDUCACIONAL E
                PARTICIPAÇÕES LTDA, indicada no preâmbulo do contrato;
              </p>
              <p><strong>1.1.3. </strong>Partes: A empresa O Primo Rico e você;</p>
              <p>
                <strong>1.1.4. </strong>Serviços: O fornecimento de vídeos <i>on demand</i> com
                conteúdo de educação financeira.
              </p>
              <p>
                <strong>1.1.5. </strong>FINCLASS: A plataforma de <i>streaming</i> que presta os
                serviços;
              </p>
              <p>
                <strong>1.1.6. </strong>CDC: Código de Defesa do Consumidor, Lei nº 8.078, de 11 de
                setembro de 1990;
              </p>
              <p>
                <strong>1.1.7. </strong>CC: Código Civil, Lei nº 10.406, de 10 de janeiro de 2002;
              </p>
              <p>
                <strong>1.1.8. </strong>LPI: Lei de Propriedade Industrial, Lei nº 9.279, de 14 de
                maio de 1996;
              </p>
              <p>
                <strong>1.1.9. </strong>LDA: Lei de Direitos Autorais, Lei nº 9.610, de 19 de
                fevereiro de 1998;
              </p>
              <p>
                <strong>1.1.10. </strong>LGPD: Lei Geral de Proteção de Dados, Lei nº 13.709, de 14
                de agosto de 2018;
              </p>
              <p>
                <strong>1.1.11. </strong>LLE: Lei de Liberdade Econômica, Lei nº 13.874, de 20 de
                setembro de 2019;
              </p>
              <p>
                <strong>1.1.12. </strong><i>Streaming</i>: Tecnologia que permite a transmissão de
                dados e informações, utilizando a rede de computadores, de modo contínuo,
                caracterizado pelo envio de dados por meio de pacotes, sem a necessidade de que o
                usuário realize download dos arquivos a serem executados, ainda que os possa fazer;
              </p>
              <p>
                <strong>1.1.13. </strong>Dispositivo eletrônico compatível: Todo dispositivo
                eletrônico, com conexão à internet, que permita o acesso à internet e que reproduza
                vídeo e som, tais como, mas não se limitando, computadores, notebooks, tablets,
                smartphones que permitam acesso à programa navegador de internet;
              </p>
              <p>
                <strong>1.1.14. </strong>Endereço IP: Endereço de protocolo da Internet, forma de
                conexão de dispositivo eletrônico a uma rede de computadores para fins de
                identificação da interface de hospedeiro e endereço de locação;
              </p>
              <p>
                <strong>1.1.15. </strong>Cookies: pequenos arquivos de texto enviados pela
                plataforma WEB, quando visitado no computador do usuário ou no seu dispositivo
                móvel, através do navegador de internet;
              </p>
              <p>
                <strong>1.1.16. </strong>Dado pessoal: informação relacionada a pessoa natural
                usuária;
              </p>
              <p>
                <strong>1.1.17. </strong>Dado anonimizado: dado relativo à titular que não possa ser
                identificado, considerando a utilização de meios técnicos razoáveis e disponíveis na
                ocasião de seu tratamento;
              </p>
              <p>
                <strong>1.1.18. </strong>Controlador: O Primo Rico, enquanto pessoa competente para
                as decisões referentes ao tratamento dos dados pessoais;
              </p>
              <p>
                <strong>1.1.19. </strong>Operador: pessoa natural ou jurídica que realiza o
                tratamento de dados pessoais em nome do controlador.
              </p>
            </div>
          </li>
          <li>
            <a @click="toggleMobileSection(2)" :class="{ active: index === 2 }">
              <div class="s-politica-wrapper_ellipse" :class="{ active: index === 2 }"></div>
              2. ACEITAÇÃO DE TERMOS E POLÍTICAS
              <img src="@/assets/img/arrow-down-gray.svg" alt="Seta para baixo" />
            </a>
            <div class="mobile-txt" :class="index === 2 ? 'show' : ''">
              <h3>2. ACEITAÇÃO DE TERMOS E POLÍTICAS</h3>
              <p>
                <strong>2.1. </strong>Este é um contrato entre você e O Primo Rico. Você deve ler
                atentamente os termos antes de utilizar os serviços disponíveis. Ao efetuar a
                assinatura dos serviços e os utilizar, você confirma expressamente que concorda com
                todos os termos do contrato, que regulamenta o uso dos serviços prestados, bem como
                a política de privacidade aqui descrita e o termo de aceite de apresentação dos
                dados pessoais.
              </p>
              <p>
                <strong>2.2. </strong>Os menores de idade civilmente incapazes para celebrar não
                podem assinar o presente contrato, devendo ser registrado por seu responsável legal,
                que se responsabiliza em acompanhar a utilização pelo menor de idade.
              </p>
              <p>
                <strong>2.3. </strong>Os responsáveis legais que tiverem menores sob sua
                responsabilidade que usem os serviços da FINCLASS sem seu consentimento, deverão nos
                contatar imediatamente, conforme termos apresentados nas cláusulas 11.3.
              </p>
            </div>
          </li>
          <li>
            <a @click="toggleMobileSection(3)" :class="{ active: index === 3 }">
              <div class="s-politica-wrapper_ellipse" :class="{ active: index === 3 }"></div>
              3. USUÁRIOS DOS SERVIÇOS
              <img src="@/assets/img/arrow-down-gray.svg" alt="Seta para baixo" />
            </a>
            <div class="mobile-txt" :class="index === 3 ? 'show' : ''">
              <h3>3. USUÁRIOS DOS SERVIÇOS</h3>
              <p>
                <strong>3.1. </strong>Somente podem se registrar como usuários dos serviços da
                FINCLASS as pessoas naturais, civilmente capazes, e pessoas jurídicas, com
                finalidade de uso pessoal e não-comercial, que se registrem para uma conta, forneçam
                as informações específicas e que concordem com o presente Contrato.
              </p>
              <p>
                <strong>3.2. </strong>Não poderão se registrar como usuários dos serviços da
                FINCLASS os menores de idade e os civilmente incapazes, observado para estes últimos
                o disposto no 2.2.
              </p>
            </div>
          </li>
          <li>
            <a @click="toggleMobileSection(4)" :class="{ active: index === 4 }">
              <div class="s-politica-wrapper_ellipse" :class="{ active: index === 4 }"></div>
              4. CONTEÚDO
              <img src="@/assets/img/arrow-down-gray.svg" alt="Seta para baixo" />
            </a>
            <div class="mobile-txt" :class="index === 4 ? 'show' : ''">
              <h3>4. CONTEÚDO</h3>
              <p>
                <strong>4.1. </strong>O conteúdo deste serviço se destina tão somente para fins
                informativos e de entretenimento. Ele não constitui sugestão ou recomendação de
                investimentos, de forma que você é inteiramente responsável pelas opções de
                investimentos que fizer, e, consequentemente, pelos ônus e bônus de suas escolhas.
              </p>
            </div>
          </li>
          <li>
            <a @click="toggleMobileSection(5)" :class="{ active: index === 5 }">
              <div class="s-politica-wrapper_ellipse" :class="{ active: index === 5 }"></div>
              5. TERMOS DE USO DO SERVIÇO
              <img src="@/assets/img/arrow-down-gray.svg" alt="Seta para baixo" />
            </a>
            <div class="mobile-txt" :class="index === 5 ? 'show' : ''">
              <h3>5. TERMOS DE USO DO SERVIÇO</h3>
              <p>
                <strong>5.1. </strong>Para ter acesso aos serviços da FINCLASS, você deverá se
                registrar como usuário e fornecer, de forma completa, os dados a seguir, os quais
                serão utilizados para fins de cobrança e fiscais: nome completo, data de nascimento,
                e-mail, telefone (todos válidos), número do CPF, endereço indicando logradouro,
                cidade, estado e CEP, bem como informações de cartão de crédito válidas”.
              </p>
              <p>
                <strong>5.1.1. </strong>Você concorda em oferecer e manter informações cadastrais
                atualizadas, completas e precisas, incluindo informações de contato para o envio de
                avisos e outras comunicações nossas.
              </p>
              <p>
                <strong>5.1.2. </strong>Você concorda em não usar identidade falsa ou declarar de
                forma imprecisa sua inscrição como sendo qualquer outra pessoa ou entidade com quem
                possua relação, incluindo o uso do nome de usuário, senha ou qualquer outra
                informação da conta, bem como do nome ou imagem de outro, ou indicar detalhes ou
                dados falsos de um parente ou guardião, tutor ou curador.
              </p>
              <p>
                <strong>5.1.3. </strong>Você concorda que a FINCLASS e O Primo Rico adotem medidas
                de confirmação das informações fornecidas.
              </p>
              <p>
                <strong>5.1.4. </strong>O registro aos serviços da FINCLASS é pessoal, não
                compartilhável e intransferível.
              </p>
              <p>
                <strong>5.2. </strong>Ao adquirir os serviços da FINCLASS pelo plano Anual, você
                terá direito ao acesso pelo período de 12 (doze) meses, a contar do dia seguinte ao
                registro, sendo que a renovação deste contrato será de forma automática, a menos que
                você solicite a não renovação automática, o cancelamento do seu plano ou alteração
                da forma de pagamento.
              </p>
              <p>
                <strong>5.2.1. </strong>
                <span class="text-underline">
                  Assim, você entende que a contratação do plano Anual Finclass não pode ser
                  fracionado em semestres, meses, semanas ou dias.
                </span>
              </p>
              <p>
                <strong>5.3. </strong>Você está ciente e dá autorização para que quaisquer avisos
                feitos pela FINCLASS ou pela empresa O Primo Rico a você poderão ser feitos das
                seguintes maneiras:
              </p>
              <p>
                <strong>5.3.1. </strong>Via correspondência eletrônica ao último e-mail por você
                indicado;
              </p>
              <p><strong>5.3.2. </strong>Via WhatsApp, SMS e/ou push;</p>
              <p><strong>5.3.3. </strong>Por meio de postagem ao endereço por você indicado.</p>
              <p>
                <strong>5.4. </strong>Para acessar os serviços da FINCLASS, você precisará de acesso
                à internet compatível com o tráfego de streaming de vídeos, incluindo vídeos de alta
                resolução, arcando com os custos de seu provedor de acesso e conexão, inclusive
                quanto a cobranças e tributos.
              </p>
              <p>
                <strong>5.4.1. </strong>O serviço da FINCLASS requer um dispositivo eletrônico
                compatível a certos softwares deste dispositivo que podem demandar atualizações
                periódicas. Você concorda que tais dispositivos serão por você atualizados, quando
                necessários, e não possuem qualquer relação com os serviços da FINCLASS ou relação
                com O Primo Rico.
              </p>
              <p>
                <strong>5.5. </strong>Os serviços da FINCLASS são fornecidos no estado em que se
                encontram, sem garantias ou condições, e são de uso pessoal e você não poderá
                utilizar os serviços em conexão com nenhum empreendimento comercial, tampouco o
                utilizará para fins comerciais ou de publicidade ou solicitação para qualquer
                usuário a comprar e/ou vender quaisquer produtos ou serviços. Você também não pode
                utilizar qualquer informação obtida do serviço para contatar, solicitar ou vender a
                qualquer outro usuário sem o seu consentimento prévio e explícito.
              </p>
              <p>
                <strong>5.6. </strong>Você declara, de maneira expressa, que tem ciência de que a
                FINCLASS ou O Primo Rico não divulgam informações de seus usuários para outros
                usuários ou terceiros, com exceção da empresa Pagar.me, e outras plataformas
                responsáveis pela cobrança do serviço, emissão de nota fiscal, comunicação,
                marketing e serviço de nuvem que receberão dados como nome, telefone, e-mail,
                endereço e dados do cartão.
              </p>
              <p>
                <strong>5.7. </strong>Você é responsável por toda a atividade que ocorre em seu
                registro, incluindo qualquer atividade por usuários não autorizados. Você está
                ciente de que não é autorizado o uso de seu registro por terceiros. Você tem o dever
                contratual de manter a confidencialidade de sua senha. Se você usar seu registro em
                outro computador ou equipamento eletrônico que permita acesso a plataforma, via WEB,
                da FINCLASS, você está ciente que deverá, para fins de proteção do acesso de seu
                registro, desfazer o login (realizar o logout) depois de usar os serviços. Se você
                tomar conhecimento de qualquer acesso por terceiros de seu registro, deve alterar a
                senha e notificar a FINCLASS imediatamente.
              </p>
              <p>
                <strong>5.8. </strong>É possível que o serviço ou parte do conteúdo não seja
                acessível por streaming a qualquer momento, devido a:
              </p>
              <p><strong>5.8.1. </strong>Manutenção do sistema ou períodos de atualização;</p>
              <p><strong>5.8.2. </strong>Perda de energia em servidores;</p>
              <p>
                <strong>5.8.3. </strong>Por resultado de conflito armado, guerras, rebeliões,
                motins, greves ou crises sociais, epidemias, pandemias e/ou quarentenas;
              </p>
              <p>
                <strong>5.8.4. </strong>Queda no fornecimento de internet, tanto para a FINCLASS
                quanto para você;
              </p>
              <p>
                <strong>5.8.5. </strong>Por atos de governos ou suas agências, em caso de emergência
                ou eventos imprevisíveis, de força maior ou fato fortuito que estejam fora do
                controle da FINCLASS, da empresa O Primo Rico ou de terceiros.
              </p>
              <p>
                <strong>5.9. </strong>A FINCLASS tomará esforços razoáveis para oferecer notificação
                prévia sobre tais interrupções, sempre que não forem publicamente disponíveis.
              </p>
              <p>
                <strong>5.10. </strong>A FINCLASS e O Primo Rico resguardam o direito de bloquear o
                seu registro se você:
              </p>
              <p><strong>5.10.1. </strong>Infringir as regras deste contrato;</p>
              <p><strong>5.10.2. </strong>Fizer uso comercial não autorizado dos serviços;</p>
              <p><strong>5.10.3. </strong>Usar os serviços para violar a lei;</p>
              <p>
                <strong>5.10.4. </strong>Compartilhar, vender, ceder, a título oneroso ou gratuito,
                ou transferir a terceiro seu registro.
              </p>
              <p>
                <strong>5.11. </strong>Você será responsável por todos os gastos e prejuízos
                decorrentes de eventual utilização do seu registro por terceiros.
              </p>
              <p>
                <strong>5.12. </strong>Você poderá fazer comentários nos serviços, programas e
                vídeos, a critério e permissão da empresa O Primo Rico. A disponibilidade de
                comentários em determinados trechos e/ou íntegras de conteúdos é de exclusiva
                decisão da empresa O Primo Rico. Você reconhece que é o único responsável por todo o
                conteúdo por você publicado por você nos comentários, isentando O Primo Rico de
                responsabilidade relacionada a quaisquer reclamações, prejuízos, perdas e danos
                causados em decorrência da publicação ou envio desses comentários.
              </p>
              <p>
                <strong>5.13. </strong>O serviço da FINCLASS, inclusive seu conteúdo, é atualizado
                regularmente. Diferentes aspectos do serviço poderão ser testados de forma contínua,
                incluindo o site, plataforma, aplicativo, interfaces de usuário, recursos
                promocionais e disponibilidade de conteúdo.
              </p>
              <p>
                <strong>5.14. </strong>Qualquer plano de período Vitalício inclui o acesso às
                ferramentas e conteúdos disponíveis para o seu respectivo plano NO MOMENTO DA
                COMPRA. Fica a critério da Finclass e do Grupo Primo a inclusão de outras
                ferramentas e conteúdos após a data de aquisição do produto.
              </p>
            </div>
          </li>
          <li>
            <a @click="toggleMobileSection(6)" :class="{ active: index === 6 }">
              <div class="s-politica-wrapper_ellipse" :class="{ active: index === 6 }"></div>
              6. PAGAMENTOS E CANCELAMENTOS
              <img src="@/assets/img/arrow-down-gray.svg" alt="Seta para baixo" />
            </a>
            <div class="mobile-txt" :class="index === 6 ? 'show' : ''">
              <h3>6. PAGAMENTOS E CANCELAMENTOS</h3>
              <p>
                <strong>6.1. </strong>O pagamento dos serviços da FINCLASS pode ser feito à vista ou
                parcelado em até 12 (doze) vezes, via cartão de crédito.
              </p>
              <p>
                <strong>6.2. </strong>O serviço, se contratado de forma anual, poderá ser cobrado de
                forma única, porém, eventual parcelamento não resulta em divisão mensal do
                fornecimento do conteúdo, mas sim mera forma de pagamento. Eventual cancelamento,
                observado o disposto no tópico 6.3 desta cláusula, não resulta em devolução de
                parcelas a vencer.
              </p>
              <p>
                <strong>6.3. </strong>O direito de arrependimento será exercido no prazo de 7 (sete)
                dias, a contar do registro do usuário, na forma prevista no art. 49 do CDC.
              </p>
              <p>
                <strong>6.4. </strong>Para o cancelamento dos serviços, você deverá entrar em
                contato com o suporte da Finclass e solicitar o cancelamento.
              </p>
              <p>
                <strong>6.4.1. </strong>
                <span class="text-underline">Caso a contratação do plano tenha sido</span>
                <strong class="text-underline"> anual </strong>
                <span class="text-underline">
                  e o pagamento tenha sido à vista, não haverá devolução de valores em caso de
                  cancelamento e você terá acesso à plataforma até o fim do plano;
                </span>
              </p>
              <p>
                <strong>6.4.2. </strong>
                <span class="text-underline">Caso a contratação do plano tenha sido</span>
                <strong class="text-underline"> anual </strong>
                <span class="text-underline">
                  e o pagamento tenha sido parcelado, ao solicitar o cancelamento, você deverá
                  honrar com o pagamento das parcelas restantes e terá acesso à plataforma até o fim
                  do plano;
                </span>
              </p>
              <p>
                <strong>6.4.3. </strong>
                <span class="text-underline">Caso a contratação do plano tenha sido</span>
                <strong class="text-underline"> fragmentada,</strong>
                <span class="text-underline">
                  por semestre, trimestre, bimestre ou mensal, ao solicitar o cancelamento, você
                  deverá honrar com o pagamento integral do plano contratado e terá acesso à
                  plataforma até o fim de cada período de contratação;
                </span>
              </p>
              <p>
                <strong>6.4.4. </strong>Na hipótese de optar pela não renovação do serviço, esta
                deverá ser solicitada com antecedência de até 30 (trinta) dias antes do fim do prazo
                de disponibilização.
              </p>
              <p>
                <strong>6.5. </strong>Eventualmente, O Primo Rico pode oferecer períodos de
                utilização gratuita dos serviços da FINCLASS em ações esporádicas e promocionais. A
                duração desses períodos será especificada durante a sua inscrição e tem a finalidade
                de novos participantes ou ex-participantes experimentarem o serviço. A elegibilidade
                ao período de utilização gratuita é determinada pela empresa O Primo Rico, que
                apontará os requisitos e duração cabíveis. O Primo Rico resguarda o direito de
                revogar a utilização gratuita e suspender seu registro se, a qualquer momento,
                apurar que você não corresponde aos critérios de elegibilidade do período de
                utilização gratuita.
              </p>
              <p>
                <strong>6.6. </strong>Na hipótese de registro de usuário dos serviços da FINCLASS em
                período de utilização gratuita, a cobrança do pagamento dos serviços somente
                ocorrerá ao final do período desta utilização, exceto se você cancelar seu registro
                antes do termo final do referido período.
              </p>
            </div>
          </li>
          <li>
            <a @click="toggleMobileSection(7)" :class="{ active: index === 7 }">
              <div class="s-politica-wrapper_ellipse" :class="{ active: index === 7 }"></div>
              7. CONCESSÕES E RESTRIÇÕES DA LICENÇA DE DIREITOS AUTORAIS E PROPRIEDADE INTELECTUAL
              <img src="@/assets/img/arrow-down-gray.svg" alt="Seta para baixo" />
            </a>
            <div class="mobile-txt" :class="index === 7 ? 'show' : ''">
              <h3>
                7. CONCESSÕES E RESTRIÇÕES DA LICENÇA DE DIREITOS AUTORAIS E PROPRIEDADE INTELECTUAL
              </h3>
              <p>
                <strong>7.1. </strong>O Primo Rico garantirá o direito limitado, de uso pessoal,
                intransferível, não passível de cessão, revogável, não exclusivo e não sub
                licenciável, seja a título oneroso ou gratuito, para:
              </p>
              <p>
                <strong>7.1.1. </strong>Fazer uso pessoal, não comercial, do serviço da FINCLASS,
                via WEB, de propriedade da empresa O Primo Rico, nos termos da LPI;
              </p>
              <p>
                <strong>7.1.2. </strong>Receber por <i>streaming</i> material protegido por direitos
                autorais, copyrights, marcas registradas, nomes de domínio ou demais da LDA ou LPI,
                incluindo, mas não se limitando, a vídeos, áudios, textos, imagens e/ou ilustrações
                que são disponibilizados por meio do serviço da FINCLASS.
              </p>
              <p>
                <strong>7.2. </strong>Este contrato lhe concede uma licença nos termos
                supramencionados e não deve ser interpretado como acordo para venda ou cessão de
                quaisquer direitos dos serviços da FINCLASS, de propriedade da empresa O Primo Rico.
                A aquisição dessa licença não se traduz como direito de propriedade sobre os
                conteúdos dos serviços da FINCLASS.
              </p>
              <p>
                <strong>7.3. </strong>As marcas e os logotipos presentes no site, plataforma ou
                aplicativo da FINCLASS são de propriedade exclusiva desta ou de terceiros que
                eventualmente as disponibilizaram.
              </p>
              <p>
                <strong class="text-underline">7.4. VOCÊ ANUI EXPRESSAMENTE QUE NÃO DEVERÁ:</strong>
              </p>
              <p>
                <strong>
                  7.4.1. Utilizar-se do serviço para cometer fraude ou estimular a prática de
                  condutas ilícitas ou contrárias à moral;
                </strong>
              </p>
              <p>
                <strong>
                  7.4.2. Alterar a configuração de seu dispositivo eletrônico para utilização dos
                  serviços, sendo proibido, inclusive, alterar os endereços IP de rede ou de correio
                  eletrônico, com objetivo de responsabilizar terceiros ou ocultar identidade ou
                  autoria ou alterar localização geográfica;
                </strong>
              </p>
              <p>
                <strong>
                  7.4.3. Publicar, inserir, reproduzir, traduzir e disponibilizar, de forma não
                  autorizada, qualquer parcela dos conteúdos do serviço;
                </strong>
              </p>
              <p>
                <strong>
                  7.4.4. Remover, alterar, evitar ou, de qualquer forma, modificar símbolo, marca,
                  logotipo ou qualquer outro sinal de identificação de propriedade da empresa O
                  Primo Rico inserido nos conteúdos do serviço da FINCLASS;
                </strong>
              </p>
              <p>
                <strong>
                  7.4.5. Copiar, fazer download, capturar, reproduzir, arquivar, distribuir, fazer
                  upload, publicar, modificar, traduzir, exibir, transmitir, retransmitir,
                  apresentar publicamente, apropriar, incorporar ou comercializar qualquer conteúdo
                  do serviço, por qualquer meio ou processo, ou de seu código de programação;
                </strong>
              </p>
              <p>
                <strong>
                  7.4.6. Criar obras audiovisuais baseadas ou derivadas nos serviços da FINCLASS;
                </strong>
              </p>
              <p>
                <strong>
                  7.4.7. Burlar, modificar, manipular ou contornar qualquer função ou proteção do
                  serviço da FINCLASS;
                </strong>
              </p>
              <p>
                <strong>
                  7.4.8. Decompilar, realizar engenharia reversa ou desmembrar qualquer software,
                  produtos ou processos disponíveis nos serviços;
                </strong>
              </p>
              <p>
                <strong>
                  7.4.9. Acessar, monitorar, copiar ou permitir que terceiro ou entidade acesse,
                  monitore ou copie qualquer elemento do serviço da FINCLASS por meio de robô,
                  indexador automático ou qualquer outro meio automatizado ou manual, sem que haja
                  permissão expressa da empresa O Primo Rico para tal;
                </strong>
              </p>
              <p><strong>7.4.10. Permitir que terceiros violem as restrições acima.</strong></p>
              <p>
                <strong>7.5. </strong>Qualquer tentativa de praticar quaisquer das restrições
                listadas nesta cláusula caracteriza violação de direitos da empresa O Primo Rico e
                dos detentores dos direitos autorais ou copyrights, podendo resultar em
                responsabilização criminal e/ou civil.
              </p>
            </div>
          </li>
          <li>
            <a @click="toggleMobileSection(8)" :class="{ active: index === 8 }">
              <div class="s-politica-wrapper_ellipse" :class="{ active: index === 8 }"></div>
              8. POLITICA DE PRIVACIDADE E PROTEÇÃO AOS DADOS PESSOAIS
              <img src="@/assets/img/arrow-down-gray.svg" alt="Seta para baixo" />
            </a>
            <div class="mobile-txt" :class="index === 8 ? 'show' : ''">
              <h3>8. POLÍTICA DE PRIVACIDADE E PROTEÇÃO AOS DADOS PESSOAIS</h3>
              <p>
                <strong>8.1. </strong>A empresa O Primo Rico, no fornecimento dos serviços da
                FINCLASS, busca proteger os dados pessoais de seus usuários, e, em atendimento ao
                disposto na LGPD, apresenta sua política de privacidade e proteção aos dados
                pessoais de seus usuários.
              </p>
              <p>
                <strong>8.2. </strong>A Política de Privacidade da FINCLASS se aplica a todos
                aqueles que adquirirem seus serviços. Ao se registrar e utilizar dos serviços da
                FINCLASS, você concorda e expressamente declara ciência com a Política de
                Privacidade da FINCLASS.
              </p>
              <p><strong>8.3. </strong>Dados para o registro do usuário.</p>
              <p>
                <strong>8.3.1. </strong>Durante o processo de cadastro, a FINCLASS solicitará os
                seguintes dados: (i) Nome completo; (ii) telefone; (iii) data de nascimento; (iv)
                e-mail; (v) cadastro de senha de usuário; (vi) logradouro completo, com indicação da
                cidade e Estado.
              </p>
              <p>
                <strong>8.3.2. </strong>Para fins de cobrança, serão solicitados os dados de cartão
                de crédito.
              </p>
              <p><strong>8.4. </strong>Dados de navegação.</p>
              <p>
                <strong>8.4.1. </strong>Para fins de navegação, realizamos a coleta de dados
                técnicos, tais como: Endereço IP (Internet Protocol), tipo e versão do navegador,
                configuração e localização do fuso horário, tipos e versões do plug-in do navegador,
                sistema operacional ou plataforma utilizada para acesso. Isto ocorre quando você
                utiliza os serviços da FINCLASS, via WEB, e preenche formulários, realiza
                comentários ou buscas, participa de eventos e demais interações com os conteúdos
                disponíveis. Para mais informações, solicitamos que leia nossa Política de Cookies.
              </p>
              <p>
                <strong>8.4.2. </strong>Os dados de navegação coletados a partir do seu acesso podem
                incluir sua localização aproximada, seu endereço IP, informações do seu dispositivo
                de acesso, da sua conexão de internet, do tipo de navegador os conteúdos que acessa
                nos serviços da FINCLASS.
              </p>
              <p>
                <strong>8.4.3. </strong>Também podemos solicitar, eventualmente, acesso à sua
                galeria de fotos, fotos em redes sociais, câmera e microfone do dispositivo
                eletrônico de acesso. Em tais situações, sempre será solicitada a sua prévia
                autorização para a coleta destes dados.
              </p>
              <p>
                <strong>8.5. </strong>Dados anonimizados. Além do tratamento de dados conforme esta
                Política de Privacidade, estes também são coletados e tratados de forma anonimizada,
                de modo que não seja possível a identificação pessoal.
              </p>
              <p>
                <strong>8.6. </strong>Tratamento dos dados. Os dados são coletados e tratados para:
              </p>
              <p><strong>8.6.1. </strong>Fornecer os serviços da FINCLASS a você para:</p>
              <p><strong>8.6.1.1. </strong>Cumprir com os termos e condições do contrato;</p>
              <p>
                <strong>8.6.1.2. </strong>Viabilizar a compra e entrega dos serviços da FINCLASS;
              </p>
              <p><strong>8.6.1.3. </strong>Processar o pagamento;</p>
              <p>
                <strong>8.6.1.4. </strong>Confirmar a veracidade e completar seus dados, conforme a
                relação estabelecida com você.
              </p>
              <p><strong>8.6.2. </strong>Contatar você, quando for necessário:</p>
              <p>
                <strong>8.6.2.1. </strong>Responder quando você entrar em contato com a FINCLASS,
                conforme a relação estabelecida com você;
              </p>
              <p><strong>8.6.2.2. </strong>Informar sobre mudanças no contrato;</p>
              <p>
                <strong>8.6.2.3. </strong>Ofertar novos serviços a você, através do seu registro,
                conta de e-mail, por mensagem de texto, aplicativo de mensagens, ligação telefônica
                e notificação instantânea.
              </p>
              <p><strong>8.6.3. </strong>Para prover segurança e proteger direitos, por meio de:</p>
              <p>
                <strong>8.6.3.1. </strong>Suporte técnico e operacional e garantir segurança e a
                funcionalidade dos Serviços;
              </p>
              <p>
                <strong>8.6.3.2. </strong>Prevenir atividades ilegais, fraudulentas ou suspeitas,
                que possam provocar danos à FINCLASS ou a empresa O Primo Rico, ou mesmo a
                terceiros;
              </p>
              <p>
                <strong>8.6.3.3. </strong>Prevenir e corrigir problemas técnicos ou de segurança;
              </p>
              <p>
                <strong>8.6.3.4. </strong>Proteger os direitos e propriedades da empresa O Primo
                Rico, inclusive de invasões, vazamentos e <i>hackeamento</i>;
              </p>
              <p>
                <strong>8.6.3.5. </strong>Proteger os direitos e propriedade de terceiros que usam
                os serviços da FINCLASS.
              </p>
              <p>
                <strong>8.6.4. </strong>Para que O Primo Rico, na prestação de serviços da FINCLASS,
                possa cumprir determinações legais, judiciais, administrativas e eventuais ofícios
                de autoridade competentes, bem como tomar ou provocar medidas legais, judiciais e
                administrativas para defender os seus direitos e direitos de terceiros, inclusive em
                qualquer processo judicial ou administrativo.
              </p>
              <p><strong>8.7. </strong>Procedimento para acessar e gerir os dados.</p>
              <p>
                <strong>8.7.1. </strong>Você poderá exercer seus direitos e tirar dúvidas sobre seus
                dados através do seu registro de acesso. Você também poderá exercer através do
                e-mail (privacy@finclass.com).
              </p>
              <p>
                <strong>8.7.2. </strong>Por meio dos procedimentos do tópico anterior, você poderá:
              </p>
              <p>
                <strong>8.7.2.1. </strong>Acessar seus dados e retificá-los quando estes estiverem
                incompletos, inexatos ou desatualizados;
              </p>
              <p><strong>8.7.2.2. </strong>Solicitar os seus dados em um formato simplificado;</p>
              <p>
                <strong>8.7.3. </strong>Você poderá solicitar a exclusão dos seus dados através de
                cancelamento do seu registro com os serviços da FINCLASS. A empresa O Primo Rico
                fará a exclusão definitiva no prazo de 180 (cento e oitenta) dias. Após esse
                período, a empresa O Primo Rico poderá manter os dados somente pelo prazo necessário
                para fins de processos judiciais, administrativos e/ou arbitrais, para cumprir
                obrigações regulatórias, para o exercício regular de direito ou em formato
                anonimizado.
              </p>
              <p><strong>8.8. </strong>Dados de menores.</p>
              <p>
                <strong>8.8.1. </strong>Não é permitido que menores de 14 (catorze) anos criem um
                registro nos serviços da FINCLASS. Para os maiores de 14 (catorze) até 18 (dezoito)
                anos não completos, é necessário consentimento parental. O procedimento de registro
                exige o preenchimento do CPF e identificação do responsável.
              </p>
              <p>
                <strong>8.8.2. </strong>Em hipótese nenhuma, O Primo Rico fará qualquer divulgação
                ou transferência de informações de dados de menores.
              </p>
              <p>
                <strong>8.9. </strong>Você reconhece que O Primo Rico é o controlador de dados
                responsável pelo processamento de seus dados pessoais, de forma a oferecê-lo o
                serviço da FINCLASS. Para fins deste contrato e na medida do determinado pela LGPD,
                poderá também ter um controlador de dados conjuntamente responsável pelo
                processamento de seus dados pessoais, hipótese que o controlar conjunto também se
                obriga aos termos deste contrato.
              </p>
              <p>
                <strong>8.10. </strong>O Primo Rico utiliza serviços e tecnologias de terceiros
                confiáveis que seguem padrões de segurança aceitáveis e que estão sujeitos à
                obrigação de confidencialidade para a realização dos serviços da FINCLASS. Seus
                dados serão compartilhados com as categorias de terceiros abaixo indicadas, sempre
                de acordo com o disposto nesta cláusula de Política de Privacidade e Proteção de
                Dados Pessoais.
              </p>
              <p>
                <strong>8.10.1. </strong>Patrocinadores e anunciantes: Para fins de cumprimento de
                exigências comerciais, promoções ou concursos, no caso de ações ou promoções
                comerciais, desde que você tenha concordado em participar de tais ações ou
                promoções;
              </p>
              <p>
                <strong>8.10.2. </strong>Empresas de pesquisa: Para oferecer um serviço mais
                adequado ao seu perfil, O Primo Rico ou seus parceiros de pesquisa podem entrar em
                contato com você para realizar enquetes e pesquisas com o intuito de testar,
                resolver problemas ou avaliar os serviços da FINCLASS;
              </p>
              <p>
                <strong>8.10.3. </strong>Prestadores de serviços de Tecnologia da Informação: Para
                que terceiros que prestem serviços de suporte técnico forneçam assistência aos
                usuários dos serviços da FINCLASS, em que poderá ser necessário que os dados sejam
                processados por terceiros, na qualidade de operadores;
              </p>
              <p>
                <strong>8.10.4. </strong>Instituições financeiras e semelhantes: Para o
                processamento do pagamento pela via de cartão de crédito, ocasião em que poderão ser
                compartilhados os dados do cartão de crédito;
              </p>
              <p>
                <strong>8.10.5. </strong>Autoridades governamentais ou judiciais: Para o cumprimento
                de obrigação legal ou regulatória, bem como cumprimento de ordem judicial.
              </p>
              <p><strong>8.11. </strong>Cookies.</p>
              <p>
                <strong>8.11.1. </strong>A plataforma da FINCLASS utiliza cookies primários, de
                terceiros e persistentes, abaixo explicados.
              </p>
              <p>
                <strong>8.11.1.1. </strong>Cookies primários: são os cookies emitidos pelo domínio
                da plataforma da FINCLASS e são utilizados para identificar preferências de idioma e
                local e para a funcionalidade básica do site, sendo estes cookies considerados
                necessários para o correto funcionamento da plataforma WEB da FINCLASS;
              </p>
              <p>
                <strong>8.11.1.2. </strong>Cookies de terceiros: são cookies que pertencem e são
                administrados por terceiros, dentro da plataforma da FINCLASS, com autorização da
                empresa O Primo Rico, que podem ser necessários ou não para produzir certos
                formulários;
              </p>
              <p>
                <strong>8.11.1.3. </strong>Cookies persistentes: são os utilizados para lembrar suas
                preferências do website e permanecem no seu dispositivo eletrônico mesmo depois de
                você fechar o seu navegador ou efetuar uma reinicialização, utilizados para analisar
                o comportamento do usuário e estabelecer padrões, de modo que a empresa O Primo Rico
                possa melhorar a funcionalidade dos serviços da FINCLASS.
              </p>
              <p><strong>8.11.2. </strong>Alteração ou bloqueio de cookies.</p>
              <p>
                <strong>8.11.2.1. </strong>A maioria dos navegadores é configurada para aceitar e
                executar os cookies. Você poderá alterar as configurações para bloquear cookies ou o
                alertar quando um cookie estiver sendo enviado ao seu dispositivo eletrônico através
                das opções de gerenciamento de seu navegador.
              </p>
              <p>
                <strong>8.11.2.2. </strong>O bloqueio de todos os cookies pode afetar a
                funcionalidade da plataforma WEB usada pela FINCLASS para prestar seus serviços.
              </p>
              <p>
                <strong>8.12. </strong>O armazenamento e tratamento dos dados obtidos pela
                plataforma WEB da FINCLASS poderão ser no Brasil ou transferidos para território
                estrangeiro, de acordo com o contrato. Independentemente da base territorial de
                armazenamento e tratamento dos dados, seja pela empresa O Primo Rico ou terceiro
                parceiro, serão tomadas todas as medidas técnicas e organizacionais de segurança e
                confidencialidade, bem como dar cumprimento devido deste contrato e, principalmente,
                todos os termos desta cláusula.
              </p>
              <p>
                <strong>8.13. </strong>Alguns links de terceiros podem estar disponíveis na
                plataforma web da FINCLASS e que poderão levá-lo a sair do site da FINCLASS. Quando
                você for direcionado a um site de terceiro, você está expressamente ciente de que a
                empresa O Primo Rico pode não ser controladora desses sites, nem o conteúdo lá
                constante. O Primo Rico não se responsabiliza pela legalidade, exatidão ou a
                natureza de qualquer conteúdo, publicidade, produtos ou outros materiais presentes
                ou disponíveis em sites vinculados. Você reconhece e concorda que O Primo Rico não
                será responsável, direta ou indiretamente, por qualquer dano ou perda causados ou
                alegadamente causados por ou em conexão com o uso de qualquer um dos links,
                conteúdos, produtos, serviços ou cookies disponíveis ou através dos sites
                vinculados.
              </p>
            </div>
          </li>
          <li>
            <a @click="toggleMobileSection(9)" :class="{ active: index === 9 }">
              <div class="s-politica-wrapper_ellipse" :class="{ active: index === 9 }"></div>
              9. SUSPENSÃO E RESCISÃO
              <img src="@/assets/img/arrow-down-gray.svg" alt="Seta para baixo" />
            </a>
            <div class="mobile-txt" :class="index === 9 ? 'show' : ''">
              <h3>9. SUSPENSÃO E RESCISÃO</h3>
              <p>
                <strong>9.1. </strong>Na suspeição de que você esteja utilizando o serviço da
                FINCLASS em descumprimento ao disposto neste contrato ou a norma legal, O Primo Rico
                tem o direito de, a seu próprio critério e a qualquer momento, restringir, suspender
                ou rescindir seu acesso ao serviço, de forma parcial ou integral. Nesta hipótese,
                você será devidamente notificado por e-mail ou no endereço indicado no ato do seu
                registro. Neste caso, não haverá compensação ou reembolso.
              </p>
            </div>
          </li>
          <li>
            <a @click="toggleMobileSection(10)" :class="{ active: index === 10 }">
              <div class="s-politica-wrapper_ellipse" :class="{ active: index === 10 }"></div>
              10. LIMITAÇÃO DE RESPONSABILIDADE E INDENIZAÇÃO
              <img src="@/assets/img/arrow-down-gray.svg" alt="Seta para baixo" />
            </a>
            <div class="mobile-txt" :class="index === 10 ? 'show' : ''">
              <h3>10. LIMITAÇÃO DE RESPONSABILIDADE E INDENIZAÇÃO</h3>
              <p>
                <strong>10.1. </strong>A FINCLASS está em constante busca de melhoria para oferecer
                a você a melhor experiência com seus serviços. No entanto, os serviços são
                disponibilizados no estado em que se encontram, sem nenhuma garantia de que sempre
                estarão livres de erros ou de que funcionarão sem interrupção, atraso ou
                imperfeição.
              </p>
              <p>
                <strong>10.2. </strong>Os links e anúncios de terceiros eventualmente publicados na
                plataforma da FINCLASS não são de responsabilidade da empresa O Primo Rico, que não
                garante a confiabilidade, exatidão ou completude destes. Se você fornecer qualquer
                informação ou se envolver em qualquer transação por meio de um anúncio, a empresa O
                Primo Rico não se responsabiliza por essa informação ou transação.
              </p>
              <p>
                <strong>10.3. </strong>A empresa O Primo Rico não é responsável pela qualidade da
                sua conexão à internet.
              </p>
              <p>
                <strong>10.4. </strong>Você concorda em indenizar, defender e isentar O Primo Rico
                de todas e quaisquer reclamações, responsabilidades e custos, incluindo honorários
                advocatícios, decorrentes de quaisquer violações ou descumprimento, por você ou seu
                dependente, ou por terceiro utilizando seu registro de acesso.
              </p>
            </div>
          </li>
          <li>
            <a @click="toggleMobileSection(11)" :class="{ active: index === 11 }">
              <div class="s-politica-wrapper_ellipse" :class="{ active: index === 11 }"></div>
              11. DISPOSIÇÕES GERAIS
              <img src="@/assets/img/arrow-down-gray.svg" alt="Seta para baixo" />
            </a>
            <div class="mobile-txt" :class="index === 11 ? 'show' : ''">
              <h3>11. DISPOSIÇÕES GERAIS</h3>
              <p>
                <strong>11.1. </strong>Ainda, são aplicáveis a este contrato, de forma geral, as
                matérias previstas nesta cláusula.
              </p>
              <p>
                <strong>11.2. </strong>Qualidade do conteúdo. A FINCLASS utiliza diversas
                tecnologias para proporcionar os serviços descritos neste contrato. A qualidade das
                imagens estará disponível nos vídeos. A qualidade de reprodução do conteúdo da
                FINCLASS, incluindo resolução, pode ser afetada pelo formato do vídeo, localização,
                velocidade, largura de banda e outras características da rede de internet por você
                utilizada.
              </p>
              <p>
                <strong>11.3. </strong>Notificações. Caso qualquer usuário considere que existam
                fatos ou circunstâncias que constituam ilicitude ou violação de quaisquer direitos
                na utilização dos serviços da FINCLASS, deverá notificar a empresa O Primo Rico
                através do e-mail (privacy@finclass.com). Você concorda e entende que o endereço
                eletrônico descrito se destina exclusivamente ao envio de denúncias e notificações
                apenas, não sendo um canal de contato com a empresa O Primo Rico, que poderá não
                responder os e-mails.
              </p>
              <p>
                <strong>11.4. </strong>Autonomia das cláusulas. Caso qualquer das cláusulas do
                presente contrato seja considerada nula, ilegítima ou inexecutável, ela não afetará,
                de nenhuma forma, a legitimidade ou eficácia do restante do contrato.
              </p>
              <p>
                <strong>11.5. </strong>Renúncia. Caso uma das partes deixe de reclamar sobre ato ou
                omissão da outra parte ou deixe de exercer qualquer direito decorrente deste
                contrato, tal conduta não constituirá, de nenhuma forma, renúncia dos direitos de
                tal parte nos termos deste contrato.
              </p>
              <p>
                <strong>11.6. </strong>Legislação aplicável. Considerando a finalidade dos serviços
                da FINCLASS, a legislação de regência e aplicável ao presente contrato é o CDC, a
                LLE, a LPI, a LDA, a LGPD e, subsidiariamente, o CC, sendo vedada a interpretação
                por equidade.
              </p>
              <p>
                <strong>11.7. </strong>Políticas de envios e ideias não solicitadas. O Primo Rico
                não aceita receber quaisquer materiais e/ou ideias não demandados ou previamente
                contratados, bem como não se responsabiliza por qualquer semelhança de seu conteúdo
                ou programação em qualquer mídia com materiais ou ideias que porventura tenham sido
                transmitidas sem autorização à empresa O Primo Rico.
              </p>
              <p>
                <strong>11.8. </strong>Títulos. Os títulos das cláusulas deste contrato são
                meramente referenciais e não deverão ser interpretados de forma a restringir seu
                alcance e plena aplicabilidade.
              </p>
              <p>
                <strong>11.9. </strong>Queixas em razão de violação de direitos autorais.
                Notificações de suposta violação de direitos autorais e contranotificações deverão
                ser encaminhadas ao endereço constante no preâmbulo deste contrato.
              </p>
              <p>
                <strong>11.10. </strong>Alterações do contrato. O Primo Rico poderá alterar este
                Contrato periodicamente, com notificação prévia de, pelo menos, 30 (trinta) dias de
                antecedência ao vigor das alterações.
              </p>
              <p>
                <strong>11.11. </strong>Cessão do contrato. O Primo Rico poderá, a qualquer momento,
                ceder ou transferir o contrato com você, inclusive os direitos e obrigações
                associados. Você concorda em cooperar com O Primo Rico nessas cessões ou
                transferências.
              </p>
            </div>
          </li>
        </ul>

        <div class="s-politica-wrapper__desktop">
          <div class="item-txt" :class="index === 1 ? 'show' : ''">
            <h3>Bem-vindo ao Finclass</h3>
            <span id="one" class="anchor-position"></span>
            <p>
              A plataforma da FINCLASS, de propriedade da empresa O PRIMO RICO MÍDIA, EDUCACIONAL E
              PARTICIPAÇÕES LTDA, pessoa jurídica inscrita no CNPJ/ME sob o nº 35.784.233/0001-07,
              com sede na Avenida Copacabana, 325, sala 201, Barueri-SP, CEP 06472-001, tem o prazer
              de oferecer-lhe os seus serviços/produtos através deste Contrato de Assinatura, que
              regula o uso da plataforma FINCLASS. Ao acessar o site, você concorda com os termos
              deste contrato. Por isso, é importante que você o leia com muita atenção.
            </p>
            <h3>1. DEFINIÇÕES DOS TERMOS UTILIZADOS NESTE CONTRATO:</h3>
            <p><strong>1.1. </strong>Para fins destes Termos de Uso, definem:</p>
            <p>
              <strong>1.1.1. </strong>Contrato ou Contrato de Assinatura: o presente contrato de
              prestação de serviços/produtos de streaming no nicho de educação financeira;
            </p>
            <p>
              <strong>1.1.2. </strong>O Primo Rico: a empresa O PRIMO RICO, MÍDIA, EDUCACIONAL E
              PARTICIPAÇÕES LTDA, indicada no preâmbulo do contrato;
            </p>
            <p><strong>1.1.3. </strong>Partes: A empresa O Primo Rico e você;</p>
            <p>
              <strong>1.1.4. </strong>Serviços: O fornecimento de vídeos <i>on demand</i> com
              conteúdo de educação financeira.
            </p>
            <p>
              <strong>1.1.5. </strong>FINCLASS: A plataforma de <i>streaming</i> que presta os
              serviços;
            </p>
            <p>
              <strong>1.1.6. </strong>CDC: Código de Defesa do Consumidor, Lei nº 8.078, de 11 de
              setembro de 1990;
            </p>
            <p>
              <strong>1.1.7. </strong>CC: Código Civil, Lei nº 10.406, de 10 de janeiro de 2002;
            </p>
            <p>
              <strong>1.1.8. </strong>LPI: Lei de Propriedade Industrial, Lei nº 9.279, de 14 de
              maio de 1996;
            </p>
            <p>
              <strong>1.1.9. </strong>LDA: Lei de Direitos Autorais, Lei nº 9.610, de 19 de
              fevereiro de 1998;
            </p>
            <p>
              <strong>1.1.10. </strong>LGPD: Lei Geral de Proteção de Dados, Lei nº 13.709, de 14 de
              agosto de 2018;
            </p>
            <p>
              <strong>1.1.11. </strong>LLE: Lei de Liberdade Econômica, Lei nº 13.874, de 20 de
              setembro de 2019;
            </p>
            <p>
              <strong>1.1.12. </strong><i>Streaming</i>: Tecnologia que permite a transmissão de
              dados e informações, utilizando a rede de computadores, de modo contínuo,
              caracterizado pelo envio de dados por meio de pacotes, sem a necessidade de que o
              usuário realize download dos arquivos a serem executados, ainda que os possa fazer;
            </p>
            <p>
              <strong>1.1.13. </strong>Dispositivo eletrônico compatível: Todo dispositivo
              eletrônico, com conexão à internet, que permita o acesso à internet e que reproduza
              vídeo e som, tais como, mas não se limitando, computadores, notebooks, tablets,
              smartphones que permitam acesso à programa navegador de internet;
            </p>
            <p>
              <strong>1.1.14. </strong>Endereço IP: Endereço de protocolo da Internet, forma de
              conexão de dispositivo eletrônico a uma rede de computadores para fins de
              identificação da interface de hospedeiro e endereço de locação;
            </p>
            <p>
              <strong>1.1.15. </strong>Cookies: pequenos arquivos de texto enviados pela plataforma
              WEB, quando visitado no computador do usuário ou no seu dispositivo móvel, através do
              navegador de internet;
            </p>
            <p>
              <strong>1.1.16. </strong>Dado pessoal: informação relacionada a pessoa natural
              usuária;
            </p>
            <p>
              <strong>1.1.17. </strong>Dado anonimizado: dado relativo à titular que não possa ser
              identificado, considerando a utilização de meios técnicos razoáveis e disponíveis na
              ocasião de seu tratamento;
            </p>
            <p>
              <strong>1.1.18. </strong>Controlador: O Primo Rico, enquanto pessoa competente para as
              decisões referentes ao tratamento dos dados pessoais;
            </p>
            <p>
              <strong>1.1.19. </strong>Operador: pessoa natural ou jurídica que realiza o tratamento
              de dados pessoais em nome do controlador.
            </p>
          </div>
          <div class="item-txt" :class="index === 2 ? 'show' : ''">
            <h3>2. ACEITAÇÃO DE TERMOS E POLÍTICAS</h3>
            <p>
              <strong>2.1. </strong>Este é um contrato entre você e O Primo Rico. Você deve ler
              atentamente os termos antes de utilizar os serviços disponíveis. Ao efetuar a
              assinatura dos serviços e os utilizar, você confirma expressamente que concorda com
              todos os termos do contrato, que regulamenta o uso dos serviços prestados, bem como a
              política de privacidade aqui descrita e o termo de aceite de apresentação dos dados
              pessoais.
            </p>
            <p>
              <strong>2.2. </strong>Os menores de idade civilmente incapazes para celebrar não podem
              assinar o presente contrato, devendo ser registrado por seu responsável legal, que se
              responsabiliza em acompanhar a utilização pelo menor de idade.
            </p>
            <p>
              <strong>2.3. </strong>Os responsáveis legais que tiverem menores sob sua
              responsabilidade que usem os serviços da FINCLASS sem seu consentimento, deverão nos
              contatar imediatamente, conforme termos apresentados nas cláusulas 11.3.
            </p>
          </div>
          <div class="item-txt" :class="index === 3 ? 'show' : ''">
            <h3>3. USUÁRIOS DOS SERVIÇOS</h3>
            <p>
              <strong>3.1. </strong>Somente podem se registrar como usuários dos serviços da
              FINCLASS as pessoas naturais, civilmente capazes, e pessoas jurídicas, com finalidade
              de uso pessoal e não-comercial, que se registrem para uma conta, forneçam as
              informações específicas e que concordem com o presente Contrato.
            </p>
            <p>
              <strong>3.2. </strong>Não poderão se registrar como usuários dos serviços da FINCLASS
              os menores de idade e os civilmente incapazes, observado para estes últimos o disposto
              no 2.2.
            </p>
          </div>
          <div class="item-txt" :class="index === 4 ? 'show' : ''">
            <h3>4. CONTEÚDO</h3>
            <p>
              <strong>4.1. </strong>O conteúdo deste serviço se destina tão somente para fins
              informativos e de entretenimento. Ele não constitui sugestão ou recomendação de
              investimentos, de forma que você é inteiramente responsável pelas opções de
              investimentos que fizer, e, consequentemente, pelos ônus e bônus de suas escolhas.
            </p>
          </div>
          <div class="item-txt" :class="index === 5 ? 'show' : ''">
            <h3>5. TERMOS DE USO DO SERVIÇO</h3>
            <p>
              <strong>5.1. </strong>Para ter acesso aos serviços da FINCLASS, você deverá se
              registrar como usuário e fornecer, de forma completa, os dados a seguir, os quais
              serão utilizados para fins de cobrança e fiscais: nome completo, data de nascimento,
              e-mail, telefone (todos válidos), número do CPF, endereço indicando logradouro,
              cidade, estado e CEP, bem como informações de cartão de crédito válidas”.
            </p>
            <p>
              <strong>5.1.1. </strong>Você concorda em oferecer e manter informações cadastrais
              atualizadas, completas e precisas, incluindo informações de contato para o envio de
              avisos e outras comunicações nossas.
            </p>
            <p>
              <strong>5.1.2. </strong>Você concorda em não usar identidade falsa ou declarar de
              forma imprecisa sua inscrição como sendo qualquer outra pessoa ou entidade com quem
              possua relação, incluindo o uso do nome de usuário, senha ou qualquer outra informação
              da conta, bem como do nome ou imagem de outro, ou indicar detalhes ou dados falsos de
              um parente ou guardião, tutor ou curador.
            </p>
            <p>
              <strong>5.1.3. </strong>Você concorda que a FINCLASS e O Primo Rico adotem medidas de
              confirmação das informações fornecidas.
            </p>
            <p>
              <strong>5.1.4. </strong>O registro aos serviços da FINCLASS é pessoal, não
              compartilhável e intransferível.
            </p>
            <p>
              <strong>5.2. </strong>Ao adquirir os serviços da FINCLASS pelo plano Anual, você terá
              direito ao acesso pelo período de 12 (doze) meses, a contar do dia seguinte ao
              registro, sendo que a renovação deste contrato será de forma automática, a menos que
              você solicite a não renovação automática, o cancelamento do seu plano ou alteração da
              forma de pagamento.
            </p>
            <p>
              <strong>5.2.1. </strong>
              <span class="text-underline">
                Assim, você entende que a contratação do plano Anual Finclass não pode ser
                fracionado em semestres, meses, semanas ou dias.
              </span>
            </p>
            <p>
              <strong>5.3. </strong>Você está ciente e dá autorização para que quaisquer avisos
              feitos pela FINCLASS ou pela empresa O Primo Rico a você poderão ser feitos das
              seguintes maneiras:
            </p>
            <p>
              <strong>5.3.1. </strong>Via correspondência eletrônica ao último e-mail por você
              indicado;
            </p>
            <p><strong>5.3.2. </strong>Via WhatsApp, SMS e/ou push;</p>
            <p><strong>5.3.3. </strong>Por meio de postagem ao endereço por você indicado.</p>
            <p>
              <strong>5.4. </strong>Para acessar os serviços da FINCLASS, você precisará de acesso à
              internet compatível com o tráfego de streaming de vídeos, incluindo vídeos de alta
              resolução, arcando com os custos de seu provedor de acesso e conexão, inclusive quanto
              a cobranças e tributos.
            </p>
            <p>
              <strong>5.4.1. </strong>O serviço da FINCLASS requer um dispositivo eletrônico
              compatível a certos softwares deste dispositivo que podem demandar atualizações
              periódicas. Você concorda que tais dispositivos serão por você atualizados, quando
              necessários, e não possuem qualquer relação com os serviços da FINCLASS ou relação com
              O Primo Rico.
            </p>
            <p>
              <strong>5.5. </strong>Os serviços da FINCLASS são fornecidos no estado em que se
              encontram, sem garantias ou condições, e são de uso pessoal e você não poderá utilizar
              os serviços em conexão com nenhum empreendimento comercial, tampouco o utilizará para
              fins comerciais ou de publicidade ou solicitação para qualquer usuário a comprar e/ou
              vender quaisquer produtos ou serviços. Você também não pode utilizar qualquer
              informação obtida do serviço para contatar, solicitar ou vender a qualquer outro
              usuário sem o seu consentimento prévio e explícito.
            </p>
            <p>
              <strong>5.6. </strong>Você declara, de maneira expressa, que tem ciência de que a
              FINCLASS ou O Primo Rico não divulgam informações de seus usuários para outros
              usuários ou terceiros, com exceção da empresa Pagar.me, e outras plataformas
              responsáveis pela cobrança do serviço, emissão de nota fiscal, comunicação, marketing
              e serviço de nuvem que receberão dados como nome, telefone, e-mail, endereço e dados
              do cartão.
            </p>
            <p>
              <strong>5.7. </strong>Você é responsável por toda a atividade que ocorre em seu
              registro, incluindo qualquer atividade por usuários não autorizados. Você está ciente
              de que não é autorizado o uso de seu registro por terceiros. Você tem o dever
              contratual de manter a confidencialidade de sua senha. Se você usar seu registro em
              outro computador ou equipamento eletrônico que permita acesso a plataforma, via WEB,
              da FINCLASS, você está ciente que deverá, para fins de proteção do acesso de seu
              registro, desfazer o login (realizar o logout) depois de usar os serviços. Se você
              tomar conhecimento de qualquer acesso por terceiros de seu registro, deve alterar a
              senha e notificar a FINCLASS imediatamente.
            </p>
            <p>
              <strong>5.8. </strong>É possível que o serviço ou parte do conteúdo não seja acessível
              por streaming a qualquer momento, devido a:
            </p>
            <p><strong>5.8.1. </strong>Manutenção do sistema ou períodos de atualização;</p>
            <p><strong>5.8.2. </strong>Perda de energia em servidores;</p>
            <p>
              <strong>5.8.3. </strong>Por resultado de conflito armado, guerras, rebeliões, motins,
              greves ou crises sociais, epidemias, pandemias e/ou quarentenas;
            </p>
            <p>
              <strong>5.8.4. </strong>Queda no fornecimento de internet, tanto para a FINCLASS
              quanto para você;
            </p>
            <p>
              <strong>5.8.5. </strong>Por atos de governos ou suas agências, em caso de emergência
              ou eventos imprevisíveis, de força maior ou fato fortuito que estejam fora do controle
              da FINCLASS, da empresa O Primo Rico ou de terceiros.
            </p>
            <p>
              <strong>5.9. </strong>A FINCLASS tomará esforços razoáveis para oferecer notificação
              prévia sobre tais interrupções, sempre que não forem publicamente disponíveis.
            </p>
            <p>
              <strong>5.10. </strong>A FINCLASS e O Primo Rico resguardam o direito de bloquear o
              seu registro se você:
            </p>
            <p><strong>5.10.1. </strong>Infringir as regras deste contrato;</p>
            <p><strong>5.10.2. </strong>Fizer uso comercial não autorizado dos serviços;</p>
            <p><strong>5.10.3. </strong>Usar os serviços para violar a lei;</p>
            <p>
              <strong>5.10.4. </strong>Compartilhar, vender, ceder, a título oneroso ou gratuito, ou
              transferir a terceiro seu registro.
            </p>
            <p>
              <strong>5.11. </strong>Você será responsável por todos os gastos e prejuízos
              decorrentes de eventual utilização do seu registro por terceiros.
            </p>
            <p>
              <strong>5.12. </strong>Você poderá fazer comentários nos serviços, programas e vídeos,
              a critério e permissão da empresa O Primo Rico. A disponibilidade de comentários em
              determinados trechos e/ou íntegras de conteúdos é de exclusiva decisão da empresa O
              Primo Rico. Você reconhece que é o único responsável por todo o conteúdo por você
              publicado por você nos comentários, isentando O Primo Rico de responsabilidade
              relacionada a quaisquer reclamações, prejuízos, perdas e danos causados em decorrência
              da publicação ou envio desses comentários.
            </p>
            <p>
              <strong>5.13. </strong>O serviço da FINCLASS, inclusive seu conteúdo, é atualizado
              regularmente. Diferentes aspectos do serviço poderão ser testados de forma contínua,
              incluindo o site, plataforma, aplicativo, interfaces de usuário, recursos promocionais
              e disponibilidade de conteúdo.
            </p>
            <p>
              <strong>5.14. </strong>Qualquer plano de período Vitalício inclui o acesso às
              ferramentas e conteúdos disponíveis para o seu respectivo plano NO MOMENTO DA COMPRA.
              Fica a critério da Finclass e do Grupo Primo a inclusão de outras ferramentas e
              conteúdos após a data de aquisição do produto.
            </p>
          </div>
          <div class="item-txt" :class="index === 6 ? 'show' : ''">
            <h3>6. PAGAMENTOS E CANCELAMENTOS</h3>
            <p>
              <strong>6.1. </strong>O pagamento dos serviços da FINCLASS pode ser feito à vista ou
              parcelado em até 12 (doze) vezes, via cartão de crédito.
            </p>
            <p>
              <strong>6.2. </strong>O serviço, se contratado de forma anual, poderá ser cobrado de
              forma única, porém, eventual parcelamento não resulta em divisão mensal do
              fornecimento do conteúdo, mas sim mera forma de pagamento. Eventual cancelamento,
              observado o disposto no tópico 6.3 desta cláusula, não resulta em devolução de
              parcelas a vencer.
            </p>
            <p>
              <strong>6.3. </strong>O direito de arrependimento será exercido no prazo de 7 (sete)
              dias, a contar do registro do usuário, na forma prevista no art. 49 do CDC.
            </p>
            <p>
              <strong>6.4. </strong>Para o cancelamento dos serviços, você deverá entrar em contato
              com o suporte da Finclass e solicitar o cancelamento.
            </p>
            <p>
              <strong>6.4.1. </strong>
              <span class="text-underline">Caso a contratação do plano tenha sido</span>
              <strong class="text-underline"> anual </strong>
              <span class="text-underline">
                e o pagamento tenha sido à vista, não haverá devolução de valores em caso de
                cancelamento e você terá acesso à plataforma até o fim do plano;
              </span>
            </p>
            <p>
              <strong>6.4.2. </strong>
              <span class="text-underline">Caso a contratação do plano tenha sido</span>
              <strong class="text-underline"> anual </strong>
              <span class="text-underline">
                e o pagamento tenha sido parcelado, ao solicitar o cancelamento, você deverá honrar
                com o pagamento das parcelas restantes e terá acesso à plataforma até o fim do
                plano;
              </span>
            </p>
            <p>
              <strong>6.4.3. </strong>
              <span class="text-underline">Caso a contratação do plano tenha sido</span>
              <strong class="text-underline"> fragmentada,</strong>
              <span class="text-underline">
                por semestre, trimestre, bimestre ou mensal, ao solicitar o cancelamento, você
                deverá honrar com o pagamento integral do plano contratado e terá acesso à
                plataforma até o fim de cada período de contratação;
              </span>
            </p>
            <p>
              <strong>6.4.4. </strong>Na hipótese de optar pela não renovação do serviço, esta
              deverá ser solicitada com antecedência de até 30 (trinta) dias antes do fim do prazo
              de disponibilização.
            </p>
            <p>
              <strong>6.5. </strong>Eventualmente, O Primo Rico pode oferecer períodos de utilização
              gratuita dos serviços da FINCLASS em ações esporádicas e promocionais. A duração
              desses períodos será especificada durante a sua inscrição e tem a finalidade de novos
              participantes ou ex-participantes experimentarem o serviço. A elegibilidade ao período
              de utilização gratuita é determinada pela empresa O Primo Rico, que apontará os
              requisitos e duração cabíveis. O Primo Rico resguarda o direito de revogar a
              utilização gratuita e suspender seu registro se, a qualquer momento, apurar que você
              não corresponde aos critérios de elegibilidade do período de utilização gratuita.
            </p>
            <p>
              <strong>6.6. </strong>Na hipótese de registro de usuário dos serviços da FINCLASS em
              período de utilização gratuita, a cobrança do pagamento dos serviços somente ocorrerá
              ao final do período desta utilização, exceto se você cancelar seu registro antes do
              termo final do referido período.
            </p>
          </div>
          <div class="item-txt" :class="index === 7 ? 'show' : ''">
            <h3>
              7. CONCESSÕES E RESTRIÇÕES DA LICENÇA DE DIREITOS AUTORAIS E PROPRIEDADE INTELECTUAL
            </h3>
            <p>
              <strong>7.1. </strong>O Primo Rico garantirá o direito limitado, de uso pessoal,
              intransferível, não passível de cessão, revogável, não exclusivo e não sub
              licenciável, seja a título oneroso ou gratuito, para:
            </p>
            <p>
              <strong>7.1.1. </strong>Fazer uso pessoal, não comercial, do serviço da FINCLASS, via
              WEB, de propriedade da empresa O Primo Rico, nos termos da LPI;
            </p>
            <p>
              <strong>7.1.2. </strong>Receber por <i>streaming</i> material protegido por direitos
              autorais, copyrights, marcas registradas, nomes de domínio ou demais da LDA ou LPI,
              incluindo, mas não se limitando, a vídeos, áudios, textos, imagens e/ou ilustrações
              que são disponibilizados por meio do serviço da FINCLASS.
            </p>
            <p>
              <strong>7.2. </strong>Este contrato lhe concede uma licença nos termos
              supramencionados e não deve ser interpretado como acordo para venda ou cessão de
              quaisquer direitos dos serviços da FINCLASS, de propriedade da empresa O Primo Rico. A
              aquisição dessa licença não se traduz como direito de propriedade sobre os conteúdos
              dos serviços da FINCLASS.
            </p>
            <p>
              <strong>7.3. </strong>As marcas e os logotipos presentes no site, plataforma ou
              aplicativo da FINCLASS são de propriedade exclusiva desta ou de terceiros que
              eventualmente as disponibilizaram.
            </p>
            <p>
              <strong class="text-underline">7.4. VOCÊ ANUI EXPRESSAMENTE QUE NÃO DEVERÁ:</strong>
            </p>
            <p>
              <strong>
                7.4.1. Utilizar-se do serviço para cometer fraude ou estimular a prática de condutas
                ilícitas ou contrárias à moral;
              </strong>
            </p>
            <p>
              <strong>
                7.4.2. Alterar a configuração de seu dispositivo eletrônico para utilização dos
                serviços, sendo proibido, inclusive, alterar os endereços IP de rede ou de correio
                eletrônico, com objetivo de responsabilizar terceiros ou ocultar identidade ou
                autoria ou alterar localização geográfica;
              </strong>
            </p>
            <p>
              <strong>
                7.4.3. Publicar, inserir, reproduzir, traduzir e disponibilizar, de forma não
                autorizada, qualquer parcela dos conteúdos do serviço;
              </strong>
            </p>
            <p>
              <strong>
                7.4.4. Remover, alterar, evitar ou, de qualquer forma, modificar símbolo, marca,
                logotipo ou qualquer outro sinal de identificação de propriedade da empresa O Primo
                Rico inserido nos conteúdos do serviço da FINCLASS;
              </strong>
            </p>
            <p>
              <strong>
                7.4.5. Copiar, fazer download, capturar, reproduzir, arquivar, distribuir, fazer
                upload, publicar, modificar, traduzir, exibir, transmitir, retransmitir, apresentar
                publicamente, apropriar, incorporar ou comercializar qualquer conteúdo do serviço,
                por qualquer meio ou processo, ou de seu código de programação;
              </strong>
            </p>
            <p>
              <strong>
                7.4.6. Criar obras audiovisuais baseadas ou derivadas nos serviços da FINCLASS;
              </strong>
            </p>
            <p>
              <strong>
                7.4.7. Burlar, modificar, manipular ou contornar qualquer função ou proteção do
                serviço da FINCLASS;
              </strong>
            </p>
            <p>
              <strong>
                7.4.8. Decompilar, realizar engenharia reversa ou desmembrar qualquer software,
                produtos ou processos disponíveis nos serviços;
              </strong>
            </p>
            <p>
              <strong>
                7.4.9. Acessar, monitorar, copiar ou permitir que terceiro ou entidade acesse,
                monitore ou copie qualquer elemento do serviço da FINCLASS por meio de robô,
                indexador automático ou qualquer outro meio automatizado ou manual, sem que haja
                permissão expressa da empresa O Primo Rico para tal;
              </strong>
            </p>
            <p><strong>7.4.10. Permitir que terceiros violem as restrições acima.</strong></p>
            <p>
              <strong>7.5. </strong>Qualquer tentativa de praticar quaisquer das restrições listadas
              nesta cláusula caracteriza violação de direitos da empresa O Primo Rico e dos
              detentores dos direitos autorais ou copyrights, podendo resultar em responsabilização
              criminal e/ou civil.
            </p>
          </div>
          <div class="item-txt" :class="index === 8 ? 'show' : ''">
            <h3>8. POLÍTICA DE PRIVACIDADE E PROTEÇÃO AOS DADOS PESSOAIS</h3>
            <p>
              <strong>8.1. </strong>A empresa O Primo Rico, no fornecimento dos serviços da
              FINCLASS, busca proteger os dados pessoais de seus usuários, e, em atendimento ao
              disposto na LGPD, apresenta sua política de privacidade e proteção aos dados pessoais
              de seus usuários.
            </p>
            <p>
              <strong>8.2. </strong>A Política de Privacidade da FINCLASS se aplica a todos aqueles
              que adquirirem seus serviços. Ao se registrar e utilizar dos serviços da FINCLASS,
              você concorda e expressamente declara ciência com a Política de Privacidade da
              FINCLASS.
            </p>
            <p><strong>8.3. </strong>Dados para o registro do usuário.</p>
            <p>
              <strong>8.3.1. </strong>Durante o processo de cadastro, a FINCLASS solicitará os
              seguintes dados: (i) Nome completo; (ii) telefone; (iii) data de nascimento; (iv)
              e-mail; (v) cadastro de senha de usuário; (vi) logradouro completo, com indicação da
              cidade e Estado.
            </p>
            <p>
              <strong>8.3.2. </strong>Para fins de cobrança, serão solicitados os dados de cartão de
              crédito.
            </p>
            <p><strong>8.4. </strong>Dados de navegação.</p>
            <p>
              <strong>8.4.1. </strong>Para fins de navegação, realizamos a coleta de dados técnicos,
              tais como: Endereço IP (Internet Protocol), tipo e versão do navegador, configuração e
              localização do fuso horário, tipos e versões do plug-in do navegador, sistema
              operacional ou plataforma utilizada para acesso. Isto ocorre quando você utiliza os
              serviços da FINCLASS, via WEB, e preenche formulários, realiza comentários ou buscas,
              participa de eventos e demais interações com os conteúdos disponíveis. Para mais
              informações, solicitamos que leia nossa Política de Cookies.
            </p>
            <p>
              <strong>8.4.2. </strong>Os dados de navegação coletados a partir do seu acesso podem
              incluir sua localização aproximada, seu endereço IP, informações do seu dispositivo de
              acesso, da sua conexão de internet, do tipo de navegador os conteúdos que acessa nos
              serviços da FINCLASS.
            </p>
            <p>
              <strong>8.4.3. </strong>Também podemos solicitar, eventualmente, acesso à sua galeria
              de fotos, fotos em redes sociais, câmera e microfone do dispositivo eletrônico de
              acesso. Em tais situações, sempre será solicitada a sua prévia autorização para a
              coleta destes dados.
            </p>
            <p>
              <strong>8.5. </strong>Dados anonimizados. Além do tratamento de dados conforme esta
              Política de Privacidade, estes também são coletados e tratados de forma anonimizada,
              de modo que não seja possível a identificação pessoal.
            </p>
            <p>
              <strong>8.6. </strong>Tratamento dos dados. Os dados são coletados e tratados para:
            </p>
            <p><strong>8.6.1. </strong>Fornecer os serviços da FINCLASS a você para:</p>
            <p><strong>8.6.1.1. </strong>Cumprir com os termos e condições do contrato;</p>
            <p><strong>8.6.1.2. </strong>Viabilizar a compra e entrega dos serviços da FINCLASS;</p>
            <p><strong>8.6.1.3. </strong>Processar o pagamento;</p>
            <p>
              <strong>8.6.1.4. </strong>Confirmar a veracidade e completar seus dados, conforme a
              relação estabelecida com você.
            </p>
            <p><strong>8.6.2. </strong>Contatar você, quando for necessário:</p>
            <p>
              <strong>8.6.2.1. </strong>Responder quando você entrar em contato com a FINCLASS,
              conforme a relação estabelecida com você;
            </p>
            <p><strong>8.6.2.2. </strong>Informar sobre mudanças no contrato;</p>
            <p>
              <strong>8.6.2.3. </strong>Ofertar novos serviços a você, através do seu registro,
              conta de e-mail, por mensagem de texto, aplicativo de mensagens, ligação telefônica e
              notificação instantânea.
            </p>
            <p><strong>8.6.3. </strong>Para prover segurança e proteger direitos, por meio de:</p>
            <p>
              <strong>8.6.3.1. </strong>Suporte técnico e operacional e garantir segurança e a
              funcionalidade dos Serviços;
            </p>
            <p>
              <strong>8.6.3.2. </strong>Prevenir atividades ilegais, fraudulentas ou suspeitas, que
              possam provocar danos à FINCLASS ou a empresa O Primo Rico, ou mesmo a terceiros;
            </p>
            <p><strong>8.6.3.3. </strong>Prevenir e corrigir problemas técnicos ou de segurança;</p>
            <p>
              <strong>8.6.3.4. </strong>Proteger os direitos e propriedades da empresa O Primo Rico,
              inclusive de invasões, vazamentos e <i>hackeamento</i>;
            </p>
            <p>
              <strong>8.6.3.5. </strong>Proteger os direitos e propriedade de terceiros que usam os
              serviços da FINCLASS.
            </p>
            <p>
              <strong>8.6.4. </strong>Para que O Primo Rico, na prestação de serviços da FINCLASS,
              possa cumprir determinações legais, judiciais, administrativas e eventuais ofícios de
              autoridade competentes, bem como tomar ou provocar medidas legais, judiciais e
              administrativas para defender os seus direitos e direitos de terceiros, inclusive em
              qualquer processo judicial ou administrativo.
            </p>
            <p><strong>8.7. </strong>Procedimento para acessar e gerir os dados.</p>
            <p>
              <strong>8.7.1. </strong>Você poderá exercer seus direitos e tirar dúvidas sobre seus
              dados através do seu registro de acesso. Você também poderá exercer através do e-mail
              (privacy@finclass.com).
            </p>
            <p>
              <strong>8.7.2. </strong>Por meio dos procedimentos do tópico anterior, você poderá:
            </p>
            <p>
              <strong>8.7.2.1. </strong>Acessar seus dados e retificá-los quando estes estiverem
              incompletos, inexatos ou desatualizados;
            </p>
            <p><strong>8.7.2.2. </strong>Solicitar os seus dados em um formato simplificado;</p>
            <p>
              <strong>8.7.3. </strong>Você poderá solicitar a exclusão dos seus dados através de
              cancelamento do seu registro com os serviços da FINCLASS. A empresa O Primo Rico fará
              a exclusão definitiva no prazo de 180 (cento e oitenta) dias. Após esse período, a
              empresa O Primo Rico poderá manter os dados somente pelo prazo necessário para fins de
              processos judiciais, administrativos e/ou arbitrais, para cumprir obrigações
              regulatórias, para o exercício regular de direito ou em formato anonimizado.
            </p>
            <p><strong>8.8. </strong>Dados de menores.</p>
            <p>
              <strong>8.8.1. </strong>Não é permitido que menores de 14 (catorze) anos criem um
              registro nos serviços da FINCLASS. Para os maiores de 14 (catorze) até 18 (dezoito)
              anos não completos, é necessário consentimento parental. O procedimento de registro
              exige o preenchimento do CPF e identificação do responsável.
            </p>
            <p>
              <strong>8.8.2. </strong>Em hipótese nenhuma, O Primo Rico fará qualquer divulgação ou
              transferência de informações de dados de menores.
            </p>
            <p>
              <strong>8.9. </strong>Você reconhece que O Primo Rico é o controlador de dados
              responsável pelo processamento de seus dados pessoais, de forma a oferecê-lo o serviço
              da FINCLASS. Para fins deste contrato e na medida do determinado pela LGPD, poderá
              também ter um controlador de dados conjuntamente responsável pelo processamento de
              seus dados pessoais, hipótese que o controlar conjunto também se obriga aos termos
              deste contrato.
            </p>
            <p>
              <strong>8.10. </strong>O Primo Rico utiliza serviços e tecnologias de terceiros
              confiáveis que seguem padrões de segurança aceitáveis e que estão sujeitos à obrigação
              de confidencialidade para a realização dos serviços da FINCLASS. Seus dados serão
              compartilhados com as categorias de terceiros abaixo indicadas, sempre de acordo com o
              disposto nesta cláusula de Política de Privacidade e Proteção de Dados Pessoais.
            </p>
            <p>
              <strong>8.10.1. </strong>Patrocinadores e anunciantes: Para fins de cumprimento de
              exigências comerciais, promoções ou concursos, no caso de ações ou promoções
              comerciais, desde que você tenha concordado em participar de tais ações ou promoções;
            </p>
            <p>
              <strong>8.10.2. </strong>Empresas de pesquisa: Para oferecer um serviço mais adequado
              ao seu perfil, O Primo Rico ou seus parceiros de pesquisa podem entrar em contato com
              você para realizar enquetes e pesquisas com o intuito de testar, resolver problemas ou
              avaliar os serviços da FINCLASS;
            </p>
            <p>
              <strong>8.10.3. </strong>Prestadores de serviços de Tecnologia da Informação: Para que
              terceiros que prestem serviços de suporte técnico forneçam assistência aos usuários
              dos serviços da FINCLASS, em que poderá ser necessário que os dados sejam processados
              por terceiros, na qualidade de operadores;
            </p>
            <p>
              <strong>8.10.4. </strong>Instituições financeiras e semelhantes: Para o processamento
              do pagamento pela via de cartão de crédito, ocasião em que poderão ser compartilhados
              os dados do cartão de crédito;
            </p>
            <p>
              <strong>8.10.5. </strong>Autoridades governamentais ou judiciais: Para o cumprimento
              de obrigação legal ou regulatória, bem como cumprimento de ordem judicial.
            </p>
            <p><strong>8.11. </strong>Cookies.</p>
            <p>
              <strong>8.11.1. </strong>A plataforma da FINCLASS utiliza cookies primários, de
              terceiros e persistentes, abaixo explicados.
            </p>
            <p>
              <strong>8.11.1.1. </strong>Cookies primários: são os cookies emitidos pelo domínio da
              plataforma da FINCLASS e são utilizados para identificar preferências de idioma e
              local e para a funcionalidade básica do site, sendo estes cookies considerados
              necessários para o correto funcionamento da plataforma WEB da FINCLASS;
            </p>
            <p>
              <strong>8.11.1.2. </strong>Cookies de terceiros: são cookies que pertencem e são
              administrados por terceiros, dentro da plataforma da FINCLASS, com autorização da
              empresa O Primo Rico, que podem ser necessários ou não para produzir certos
              formulários;
            </p>
            <p>
              <strong>8.11.1.3. </strong>Cookies persistentes: são os utilizados para lembrar suas
              preferências do website e permanecem no seu dispositivo eletrônico mesmo depois de
              você fechar o seu navegador ou efetuar uma reinicialização, utilizados para analisar o
              comportamento do usuário e estabelecer padrões, de modo que a empresa O Primo Rico
              possa melhorar a funcionalidade dos serviços da FINCLASS.
            </p>
            <p><strong>8.11.2. </strong>Alteração ou bloqueio de cookies.</p>
            <p>
              <strong>8.11.2.1. </strong>A maioria dos navegadores é configurada para aceitar e
              executar os cookies. Você poderá alterar as configurações para bloquear cookies ou o
              alertar quando um cookie estiver sendo enviado ao seu dispositivo eletrônico através
              das opções de gerenciamento de seu navegador.
            </p>
            <p>
              <strong>8.11.2.2. </strong>O bloqueio de todos os cookies pode afetar a funcionalidade
              da plataforma WEB usada pela FINCLASS para prestar seus serviços.
            </p>
            <p>
              <strong>8.12. </strong>O armazenamento e tratamento dos dados obtidos pela plataforma
              WEB da FINCLASS poderão ser no Brasil ou transferidos para território estrangeiro, de
              acordo com o contrato. Independentemente da base territorial de armazenamento e
              tratamento dos dados, seja pela empresa O Primo Rico ou terceiro parceiro, serão
              tomadas todas as medidas técnicas e organizacionais de segurança e confidencialidade,
              bem como dar cumprimento devido deste contrato e, principalmente, todos os termos
              desta cláusula.
            </p>
            <p>
              <strong>8.13. </strong>Alguns links de terceiros podem estar disponíveis na plataforma
              web da FINCLASS e que poderão levá-lo a sair do site da FINCLASS. Quando você for
              direcionado a um site de terceiro, você está expressamente ciente de que a empresa O
              Primo Rico pode não ser controladora desses sites, nem o conteúdo lá constante. O
              Primo Rico não se responsabiliza pela legalidade, exatidão ou a natureza de qualquer
              conteúdo, publicidade, produtos ou outros materiais presentes ou disponíveis em sites
              vinculados. Você reconhece e concorda que O Primo Rico não será responsável, direta ou
              indiretamente, por qualquer dano ou perda causados ou alegadamente causados por ou em
              conexão com o uso de qualquer um dos links, conteúdos, produtos, serviços ou cookies
              disponíveis ou através dos sites vinculados.
            </p>
          </div>
          <div class="item-txt" :class="index === 9 ? 'show' : ''">
            <h3>9. SUSPENSÃO E RESCISÃO</h3>
            <p>
              <strong>9.1. </strong>Na suspeição de que você esteja utilizando o serviço da FINCLASS
              em descumprimento ao disposto neste contrato ou a norma legal, O Primo Rico tem o
              direito de, a seu próprio critério e a qualquer momento, restringir, suspender ou
              rescindir seu acesso ao serviço, de forma parcial ou integral. Nesta hipótese, você
              será devidamente notificado por e-mail ou no endereço indicado no ato do seu registro.
              Neste caso, não haverá compensação ou reembolso.
            </p>
          </div>
          <div class="item-txt" :class="index === 10 ? 'show' : ''">
            <h3>10. LIMITAÇÃO DE RESPONSABILIDADE E INDENIZAÇÃO</h3>
            <p>
              <strong>10.1. </strong>A FINCLASS está em constante busca de melhoria para oferecer a
              você a melhor experiência com seus serviços. No entanto, os serviços são
              disponibilizados no estado em que se encontram, sem nenhuma garantia de que sempre
              estarão livres de erros ou de que funcionarão sem interrupção, atraso ou imperfeição.
            </p>
            <p>
              <strong>10.2. </strong>Os links e anúncios de terceiros eventualmente publicados na
              plataforma da FINCLASS não são de responsabilidade da empresa O Primo Rico, que não
              garante a confiabilidade, exatidão ou completude destes. Se você fornecer qualquer
              informação ou se envolver em qualquer transação por meio de um anúncio, a empresa O
              Primo Rico não se responsabiliza por essa informação ou transação.
            </p>
            <p>
              <strong>10.3. </strong>A empresa O Primo Rico não é responsável pela qualidade da sua
              conexão à internet.
            </p>
            <p>
              <strong>10.4. </strong>Você concorda em indenizar, defender e isentar O Primo Rico de
              todas e quaisquer reclamações, responsabilidades e custos, incluindo honorários
              advocatícios, decorrentes de quaisquer violações ou descumprimento, por você ou seu
              dependente, ou por terceiro utilizando seu registro de acesso.
            </p>
          </div>
          <div class="item-txt" :class="index === 11 ? 'show' : ''">
            <h3>11. DISPOSIÇÕES GERAIS</h3>
            <p>
              <strong>11.1. </strong>Ainda, são aplicáveis a este contrato, de forma geral, as
              matérias previstas nesta cláusula.
            </p>
            <p>
              <strong>11.2. </strong>Qualidade do conteúdo. A FINCLASS utiliza diversas tecnologias
              para proporcionar os serviços descritos neste contrato. A qualidade das imagens estará
              disponível nos vídeos. A qualidade de reprodução do conteúdo da FINCLASS, incluindo
              resolução, pode ser afetada pelo formato do vídeo, localização, velocidade, largura de
              banda e outras características da rede de internet por você utilizada.
            </p>
            <p>
              <strong>11.3. </strong>Notificações. Caso qualquer usuário considere que existam fatos
              ou circunstâncias que constituam ilicitude ou violação de quaisquer direitos na
              utilização dos serviços da FINCLASS, deverá notificar a empresa O Primo Rico através
              do e-mail (privacy@finclass.com). Você concorda e entende que o endereço eletrônico
              descrito se destina exclusivamente ao envio de denúncias e notificações apenas, não
              sendo um canal de contato com a empresa O Primo Rico, que poderá não responder os
              e-mails.
            </p>
            <p>
              <strong>11.4. </strong>Autonomia das cláusulas. Caso qualquer das cláusulas do
              presente contrato seja considerada nula, ilegítima ou inexecutável, ela não afetará,
              de nenhuma forma, a legitimidade ou eficácia do restante do contrato.
            </p>
            <p>
              <strong>11.5. </strong>Renúncia. Caso uma das partes deixe de reclamar sobre ato ou
              omissão da outra parte ou deixe de exercer qualquer direito decorrente deste contrato,
              tal conduta não constituirá, de nenhuma forma, renúncia dos direitos de tal parte nos
              termos deste contrato.
            </p>
            <p>
              <strong>11.6. </strong>Legislação aplicável. Considerando a finalidade dos serviços da
              FINCLASS, a legislação de regência e aplicável ao presente contrato é o CDC, a LLE, a
              LPI, a LDA, a LGPD e, subsidiariamente, o CC, sendo vedada a interpretação por
              equidade.
            </p>
            <p>
              <strong>11.7. </strong>Políticas de envios e ideias não solicitadas. O Primo Rico não
              aceita receber quaisquer materiais e/ou ideias não demandados ou previamente
              contratados, bem como não se responsabiliza por qualquer semelhança de seu conteúdo ou
              programação em qualquer mídia com materiais ou ideias que porventura tenham sido
              transmitidas sem autorização à empresa O Primo Rico.
            </p>
            <p>
              <strong>11.8. </strong>Títulos. Os títulos das cláusulas deste contrato são meramente
              referenciais e não deverão ser interpretados de forma a restringir seu alcance e plena
              aplicabilidade.
            </p>
            <p>
              <strong>11.9. </strong>Queixas em razão de violação de direitos autorais. Notificações
              de suposta violação de direitos autorais e contranotificações deverão ser encaminhadas
              ao endereço constante no preâmbulo deste contrato.
            </p>
            <p>
              <strong>11.10. </strong>Alterações do contrato. O Primo Rico poderá alterar este
              Contrato periodicamente, com notificação prévia de, pelo menos, 30 (trinta) dias de
              antecedência ao vigor das alterações.
            </p>
            <p>
              <strong>11.11. </strong>Cessão do contrato. O Primo Rico poderá, a qualquer momento,
              ceder ou transferir o contrato com você, inclusive os direitos e obrigações
              associados. Você concorda em cooperar com O Primo Rico nessas cessões ou
              transferências.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import TitlePages from '@/components/TitlePages';
import { utils } from '@/mixins/utils.js';

export default {
  name: 'PrivacyPolicy',
  components: { TitlePages },
  mixins: [utils],
  data() {
    return {
      index: 1,
    };
  },
  methods: {
    toggleMobileSection(indexToMove) {
      if (this.index === indexToMove && !this.isDesktopDevice()) {
        this.index = undefined;
        return;
      }

      this.index = indexToMove;
    },
  },
  created() {
    if (this.$route.params.id !== '') {
      this.index = +this.$route.params.id;
    }
  },
};
</script>

<style lang="scss">
@import '../assets/scss/_colors.scss';

.text-italic {
  font-style: italic;
}

.text-underline {
  text-decoration: underline;
}

.s-politica {
  .s-politica-wrapper {
    width: 100%;
    display: flex;
    align-items: flex-start;
    background-color: $dark-700;

    .s-politica-wrapper__menu {
      width: 630px;
      padding: 80px 40px 40px 80px;

      li {
        margin-bottom: 2.5rem;
        opacity: 0.7;
        font-weight: 600;
        letter-spacing: -0.005em;
        list-style: none;
        color: $dark-600;
        cursor: pointer;

        > a {
          max-width: 480px;
          line-height: 115%;
          font-weight: 600;
          font-size: 1rem;
          letter-spacing: -0.005em;
          color: $white;
          opacity: 0.7;
          display: flex;
          align-items: center;
          gap: 24px;

          &.active {
            opacity: 1;
          }

          > img {
            display: none;
          }

          .s-politica-wrapper_ellipse {
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background-color: $dark-200;

            &.active {
              background-color: $dark-900;
            }
          }
        }

        &:last-child {
          margin-bottom: 0;
        }

        .mobile-txt {
          display: none;
        }
      }
    }

    .s-politica-wrapper__desktop {
      min-height: 760px;
      padding: 80px 80px 80px 64px;
      display: block;
      flex: 1;
      background-color: $white;
      color: $dark-700;

      .item-txt {
        margin-bottom: 3rem;
        display: none;
        background-color: $white;
        color: $dark-700;

        &.show {
          display: block;
          animation-name: show;
          animation-duration: 1s;
          animation-fill-mode: forwards;
        }

        h3 {
          margin-bottom: 24px;
          font-weight: bold;
          font-size: 1.125rem;
          line-height: 22px;
          color: $dark-700;
        }

        p {
          margin-bottom: 16px;
          font-weight: normal;
          font-size: 1rem;
          line-height: 150%;
          color: $dark-400;

          > strong {
            font-weight: 600;
            color: $dark-400;
          }

          > i {
            font-style: italic;
            color: $dark-400;
          }

          > span {
            color: $dark-400;
          }
        }
      }
    }
  }

  @media (max-width: 1100px) {
    .s-politica-wrapper {
      .s-politica-wrapper__menu {
        width: 450px;

        li a .s-politica-wrapper_ellipse {
          display: none;
        }
      }
    }
  }

  @media (max-width: 830px) {
    .s-politica-wrapper {
      background-color: $white;

      .s-politica-wrapper__menu {
        width: 100%;
        padding: 46px 20px 20px 20px;

        li {
          margin-bottom: 4px;

          > a {
            max-width: 100%;
            padding: 20px 24px;
            text-align: left;
            font-size: 0.875rem;
            font-weight: 600;
            background-color: $dark-700;
            color: $white;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            > img {
              display: block;
            }
          }

          .mobile-txt {
            padding-top: 32px;
            display: none;

            &.show {
              display: block;
              animation-name: show;
              animation-duration: 1s;
              animation-fill-mode: forwards;
            }

            > h3 {
              font-size: 1rem;
              font-weight: bold;
              margin-bottom: 24px;
              color: $dark-700;
            }

            p {
              margin-bottom: 16px;
              font-weight: normal;
              font-size: 1rem;
              line-height: 150%;
              color: $dark-400;

              > strong {
                font-weight: 600;
                color: $dark-400;
              }

              > i {
                font-style: italic;
                color: $dark-400;
              }

              > span {
                color: $dark-400;
              }
            }
          }
        }
      }

      .s-politica-wrapper__desktop {
        display: none;
      }
    }
  }
}

@keyframes show {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
