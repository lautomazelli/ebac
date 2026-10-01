import tarotImg from './assets/imagens-livros/o-tarot-caminhos-e-simbolos.png'
import astrologiaImg from './assets/imagens-livros/astrologia-para-alem-dos-signos.png'
import arquetiposImg from './assets/imagens-livros/o-livro-dos-arquetipos.png'
import magiaImg from './assets/imagens-livros/magia-natural-ervas-situais-e-simbolismos.png'
import espiritualidadeImg from './assets/imagens-livros/espiritualidade-uma-jornada-interior.png'
import cristaisImg from './assets/imagens-livros/cristais-e-seus-poderes.png'
import intuicaoImg from './assets/imagens-livros/o-poder-da-intuicao.png'
import rituaisImg from './assets/imagens-livros/rituais-para-o-dia-adia.png'
import tarotIcon from './assets/icons/tarot.png'
import astrologiaIcon from './assets/icons/astrologia.png'
import lotusIcon from './assets/icons/simbolo-lotus.png'
import ocultoIcon from './assets/icons/simbolo-oculto.png'
import cristaisIcon from './assets/icons/cristais.png'

export const initialProducts = [
  {
    id: 1,
    name: 'O Tarot: Caminhos e Símbolos',
    category: 'Tarot & Oráculos',
    price: 89.9,
    image: tarotImg,
    description: 'Um guia completo para compreender os arcanos e suas múltiplas interpretações.',
    details: 'Uma introdução cuidadosa ao universo do Tarot, explorando os símbolos, os arcanos e diferentes caminhos de interpretação para quem deseja aprofundar a prática com mais clareza e confiança.',
  },
  {
    id: 2,
    name: 'Astrologia para Além dos Signos',
    category: 'Astrologia',
    price: 74.9,
    image: astrologiaImg,
    description: 'Uma visão mais profunda da astrologia, dos ciclos e da sua jornada interior.',
    details: 'Uma leitura que vai além dos signos solares para apresentar mapas, ciclos, casas e símbolos como ferramentas de autoconhecimento e observação dos ritmos da vida.',
  },
  {
    id: 3,
    name: 'O Livro dos Arquétipos',
    category: 'Espiritualidade',
    price: 69.9,
    image: arquetiposImg,
    description: 'Descubra o poder dos arquétipos e como eles influenciam sua vida.',
    details: 'Uma jornada pelo universo simbólico dos arquétipos, conectando imagens, narrativas e padrões humanos a processos de reflexão, identidade e transformação pessoal.',
  },
  {
    id: 4,
    name: 'Magia Natural: Ervas, Rituais e Simbolismos',
    category: 'Magia & Ocultismo',
    price: 64.9,
    image: magiaImg,
    description: 'Aprenda a usar as forças da natureza em rituais simples e poderosos.',
    details: 'Um passeio por ervas, correspondências, práticas e simbolismos da magia natural, apresentado de forma acessível para quem deseja criar seus próprios estudos e rituais.',
  },
  {
    id: 5,
    name: 'Espiritualidade: Uma Jornada Interior',
    category: 'Espiritualidade',
    price: 72.9,
    image: espiritualidadeImg,
    description: 'Reflexões para cultivar presença, propósito e conexão com a própria jornada.',
    details: 'Um convite à investigação interior por meio de reflexões sobre presença, propósito, símbolos e pequenas práticas que podem acompanhar diferentes momentos da vida.',
  },
  {
    id: 6,
    name: 'Cristais e Seus Poderes',
    category: 'Cristais & Simbolismo',
    price: 59.9,
    image: cristaisImg,
    description: 'Conheça cristais, significados e formas tradicionais de trabalhar seus simbolismos.',
    details: 'Um catálogo introdutório de cristais e seus significados simbólicos, com ideias para estudo, organização de coleções e práticas pessoais relacionadas ao universo mineral.',
  },
  {
    id: 7,
    name: 'O Poder da Intuição',
    category: 'Espiritualidade',
    price: 67.9,
    image: intuicaoImg,
    description: 'Um guia para observar a intuição e desenvolver uma escuta interior mais consciente.',
    details: 'Reflexões e exercícios voltados à percepção dos próprios sinais internos, incentivando uma relação mais atenta com sentimentos, escolhas e processos de autoconhecimento.',
  },
  {
    id: 8,
    name: 'Rituais para o Dia a Dia',
    category: 'Magia & Ocultismo',
    price: 62.9,
    image: rituaisImg,
    description: 'Pequenos rituais e práticas simbólicas para trazer intenção à rotina.',
    details: 'Uma coleção de práticas simples para marcar transições, cultivar intenção e criar momentos de pausa, sempre tratando o ritual como uma linguagem simbólica para a vida cotidiana.',
  },
]

export const categories = [
  { name: 'Tarot & Oráculos', icon: tarotIcon },
  { name: 'Astrologia', icon: astrologiaIcon },
  { name: 'Espiritualidade', icon: lotusIcon },
  { name: 'Magia & Ocultismo', icon: ocultoIcon },
  { name: 'Cristais & Simbolismo', icon: cristaisIcon },
]
