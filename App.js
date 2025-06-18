import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import * as Font from 'expo-font';

export default function App() {
  // Estado atual do pet: 'normal', 'fome', 'feliz' ou 'coco'
  const [estadoPet, setEstadoPet] = useState('normal');

  // Texto visível na fala do pet (balão)
  const [fala, setFala] = useState('');

  // Controle para saber se a fonte pixel foi carregada
  const [fonteCarregada, setFonteCarregada] = useState(false);

  // Ref para controlar o timeout da fala e evitar sobreposição
  const falaTimeout = useRef(null);

  // Lista de fundos disponíveis para o fundo da tela
  const fundos = [
    require('./assets/fundos/fundo1.jpg'),
    require('./assets/fundos/fundo2.jpg'),
    require('./assets/fundos/fundo3.jpg'),
    require('./assets/fundos/fundo4.jpg'),
    require('./assets/fundos/fundo5.jpg'),
    require('./assets/fundos/fundo6.jpg'),
    require('./assets/fundos/fundo7.jpg'),
    require('./assets/fundos/fundo8.jpg'),
    require('./assets/fundos/fundo9.jpg'),
    require('./assets/fundos/fundo10.jpg'),
    require('./assets/fundos/fundo11.jpg'),
    require('./assets/fundos/fundo12.jpg'),
    require('./assets/fundos/fundo13.jpg'),
    require('./assets/fundos/fundo14.jpg'),
    require('./assets/fundos/fundo15.jpg'),
  ];
  // Estado para guardar o índice do fundo atual selecionado
  const [fundoAtual, setFundoAtual] = useState(0);

  // Quantidade acumulada de cocôs na tela
  const [quantidadeCoco, setQuantidadeCoco] = useState(0);

  // Lista de chapéus disponíveis para o pet
  const chapeus = [
    null,
    require('./assets/chapeus/chapeu7.png'),
    require('./assets/chapeus/chapeu5.png'),
    require('./assets/chapeus/chapeu6.png'),

  ];

  //estilo dos chapéus
  const estilosChapeus = {
  1: { width: 200, height: 130, top: -50 },
  2: { width: 130, height: 100, top: -50},
  3: { width: 100, height: 99, top: -45},
  };

  // Estado para armazenar o chapéu atual selecionado
  const [chapeuAtual, setChapeuAtual] = useState(0);

  // Tempo (em ms) para o pet começar a sentir fome após estar normal
  const TEMPO_PARA_SENTIR_FOME = 9000; // 30 segundos

  // Carrega a fonte pixel ao iniciar o app
  useEffect(() => {
    async function carregarFonte() {
      await Font.loadAsync({
        pixel: require('./assets/fonts/PressStart2P-Regular.ttf'),
      });
      setFonteCarregada(true);
    }
    carregarFonte();
  }, []);

  // Exibe falas diferentes dependendo do estado atual do pet
  useEffect(() => {
    const mensagens = {
      normal: ['Estou bem!', 'Adoro esse lugar!', 'Tudo tranquilo.'],
      fome: ['Estou com fome!', 'Me dá comida!', 'Preciso comer!'],
      coco: ['Fiz cocô...', 'Ops... sujou!', 'Alguém limpa isso?'],
      feliz: ['Obrigado!', 'Amei isso!', 'Delícia!'],
    };

    // Seleciona uma fala aleatória para o estado atual
    const opcoes = mensagens[estadoPet] || [''];
    const falaAleatoria = opcoes[Math.floor(Math.random() * opcoes.length)];
    setFala(falaAleatoria);

    // Limpa timeout anterior antes de criar um novo para evitar sobreposição
    if (falaTimeout.current) {
      clearTimeout(falaTimeout.current);
    }
    falaTimeout.current = setTimeout(() => setFala(''), 2000);

    // Cleanup do efeito para limpar o timeout quando o componente desmontar ou estado mudar
    return () => {
      if (falaTimeout.current) {
        clearTimeout(falaTimeout.current);
      }
    };
  }, [estadoPet]);

  // Inicia o timer para o pet ficar com fome somente se estiver no estado 'normal'
  useEffect(() => {
    if (estadoPet !== 'normal') return; // Só inicia timer se estiver normal

    const id = setTimeout(() => {
      setEstadoPet('fome');
    }, TEMPO_PARA_SENTIR_FOME);

    // Limpa o timer caso o estado mude antes do tempo acabar
    return () => clearTimeout(id);
  }, [estadoPet]);

  // Função chamada ao alimentar o pet, válida para estados 'fome' e 'coco'
  function alimentarPet() {
    if (estadoPet === 'fome' || estadoPet === 'coco') {
      setEstadoPet('feliz');

      // Após 8 segundos, pet faz cocô aumentando a quantidade e muda para estado 'coco'
      setTimeout(() => {
        setQuantidadeCoco(prev => prev + 1);
        setEstadoPet('coco');
      }, 8000);
    }
  }

  // Função para limpar todos os cocôs acumulados e retornar o pet para estado 'normal'
  function limparCoco() {
    setQuantidadeCoco(0);
    setEstadoPet('normal');
  }

  // Função para trocar o fundo para o próximo da lista
  function trocarFundo() {
    const proximoFundo = (fundoAtual + 1) % fundos.length;
    setFundoAtual(proximoFundo);
  }

  // Função para trocar o chapéu do pet para o próximo da lista
  function trocarChapeu() {
    const proximoChapeu = (chapeuAtual + 1) % chapeus.length;
    setChapeuAtual(proximoChapeu);
  }

  // Imagens do pet para cada estado
  const imagemPet = {
    normal: require('./assets/gifs/petChild.gif'),
    fome: require('./assets/gifs/petChildCry.gif'),
    coco: require('./assets/gifs/petChild.gif'),
    feliz: require('./assets/gifs/petChild.gif'),
  };

  // Efeitos visuais (coração, brilho, cocô)
  const efeitos = {
    coracao: require('./assets/gifs/petBigSparkles.gif'),
    brilho: require('./assets/gifs/petSparkles.gif'),
    coco: require('./assets/gifs/petPoo.gif'),
  };

  // Nome do pet
  const [nomePet, setNomePet] = useState('Salt');

  return (
    <View style={estilos.tela}>
      {/* Fundo atual */}
      <Image source={fundos[fundoAtual]} style={estilos.fundo} />

      {/* Botão para trocar o fundo */}
      <TouchableOpacity
        onPress={trocarFundo}
        style={[estilos.pincelBtn, { transform: [{ rotate: '-20deg' }] }]}
      >
        <Image
          source={require('./assets/icones/spray.png')}
          style={estilos.imagempincel}
        />
      </TouchableOpacity>

      {/* Botão para trocar chapéu */}
      <TouchableOpacity onPress={trocarChapeu} style={estilos.botaoChapeu}>
        <Image source={require('./assets/icones/cabide.png')} style={estilos.imagemBotao} />
      </TouchableOpacity>

      {/* Botões de ação: alimentar e limpar cocô */}
      <View style={estilos.botoesContainer}>
        <TouchableOpacity
          onPress={alimentarPet}
          disabled={estadoPet !== 'fome' && estadoPet !== 'coco'}
          style={[
            estilos.botao,
            estilos.botaoComida,
            estadoPet !== 'fome' && estadoPet !== 'coco' && estilos.botaoDesativado,
          ]}
        >
          <Image source={require('./assets/icones/comida.png')} style={estilos.imagemBotao} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={limparCoco}
          disabled={quantidadeCoco === 0}
          style={[
            estilos.botao,
            estilos.botaoLimpar,
            quantidadeCoco === 0 && estilos.botaoDesativado,
          ]}
        >
          <Image source={require('./assets/icones/limpar.png')} style={estilos.imagemBotao} />
        </TouchableOpacity>
      </View>

      {/* Balão de fala do pet */}
      {fala !== '' && (
        <View style={estilos.containerBalao}>
          <Text style={estilos.textoBalao}>{fala}</Text>
          <View style={estilos.setaBalao} />
        </View>
      )}

      {/* Área do pet: nome, chapéu, imagem, efeitos e cocô */}
      <View style={estilos.areaPet}>
        {/* Nome do pet */}
        <Text style={estilos.nomePet}>{nomePet}</Text>

        {/* Chapéu atual, se houver */}
        {chapeus[chapeuAtual] && (
          <Image
            source={chapeus[chapeuAtual]}
            style={[estilos.chapeu, estilosChapeus[chapeuAtual] || {}]}
          />
        )}


        {/* Imagem do pet de acordo com o estado */}
        <Image source={imagemPet[estadoPet]} style={estilos.imagemPet} />

        {/* Efeito de coração quando está feliz */}
        {estadoPet === 'feliz' && (
          <Image source={efeitos.coracao} style={estilos.efeito} />
        )}

        {/* Mostrar cocôs acumulados na tela */}
        {quantidadeCoco > 0 &&
          Array.from({ length: quantidadeCoco }).map((_, index) => (
            <Image
              key={index}
              source={efeitos.coco}
              style={[estilos.efeitoCoco, { left: 100 - index * 30 }]}
            />
          ))}
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    alignItems: 'center',
  },
  fundo: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    zIndex: -2,
  },
  botoesContainer: {
    marginTop: 100,
    flexDirection: 'row',
    gap: 20,
  },
  botao: {
    width: 70,
    height: 70,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
  },
  botaoComida: {
    backgroundColor: '#f0c9b8',
    borderColor: '#d06a36',
  },
  botaoLimpar: {
    backgroundColor: '#FFF',
    borderColor: '#b3bcec',
  },
  botaoDesativado: {
    opacity: 0.4,
  },
  imagemBotao: {
    width: 45,
    height: 45,
  },
  imagempincel: {
    width: 40,
    height: 40,
  },
  pincelBtn: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
  botaoChapeu: {
    position: 'absolute',
    top: 105,
    right: 20,
  },
  areaPet: {
  position: 'absolute',
  bottom: 90,
  alignItems: 'center', // centraliza conteúdo horizontalmente
  },
  imagemPet: {
    width: 170,
    height: 170,
  },
  chapeu: {
  position: 'absolute',
  resizeMode: 'contain',
  zIndex: 2,
},
  efeito: {
    position: 'absolute',
    width: 50,
    height: 50,
    top: 60,
    left: 120,
  },
  efeitoCoco: {
    width: 80,
    height: 80,
    bottom: 10,
    position: 'absolute',
  },
  containerBalao: {
  position: 'absolute',
  top: '30%',
  alignSelf: 'center',
  alignItems: 'center',
  zIndex: 10,
  Width: 200,
  height: 40,
  paddingVertical: 10,
  paddingHorizontal: 12,
  backgroundColor: '#f6863d', // laranja principal
  borderWidth: 4,
  borderColor: '#fcd267', // borda do balão
},

textoBalao: {
  color: '#000',
  fontSize: 12,
  fontFamily: 'pixel', // se estiver usando fonte pixelada
  textAlign: 'center',
},
  textoPixel: {
    color: '#000',
    fontSize: 10,
    fontFamily: 'pixel',
    textAlign: 'center',
    lineHeight: 12,
  },
  nomePet: {
  position: 'absolute',
  bottom: 260,
  alignSelf: 'center',
  backgroundColor: '#000000aa',
  paddingHorizontal: 8,
  paddingVertical: 4,
  borderRadius: 10,
  fontFamily: 'pixel',
  fontSize: 10,
  color: '#fff',
  textAlign: 'center',
  maxWidth: 200,
  width: 90,
  height: 20
},
});
