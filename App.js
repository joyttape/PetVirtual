import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import * as Font from 'expo-font';

export default function App() {
  // Estado atual do pet: 'normal', 'fome', 'feliz' ou 'coco'
  const [estadoPet, setEstadoPet] = useState('normal');

  // Fala visível do pet (texto no balão)
  const [fala, setFala] = useState('');

  // Controle para saber se a fonte foi carregada
  const [fonteCarregada, setFonteCarregada] = useState(false);

  // Lista de fundos disponíveis
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
  const [fundoAtual, setFundoAtual] = useState(0);

  // Quantidade de cocôs acumulados
  const [quantidadeCoco, setQuantidadeCoco] = useState(0);

  // Lista de chapéus
  const chapeus = [
    null,
    require('./assets/chapeus/chapeu1.png'),
    require('./assets/chapeus/chapeu2.png'),
  ];
  const [chapeuAtual, setChapeuAtual] = useState(0);

  // Carrega a fonte pixel quando o app inicia
  useEffect(() => {
    async function carregarFonte() {
      await Font.loadAsync({
        pixel: require('./assets/fonts/PressStart2P-Regular.ttf'),
      });
      setFonteCarregada(true);
    }
    carregarFonte();
  }, []);

  // Mostra falas diferentes de acordo com o estado do pet
  useEffect(() => {
    const mensagens = {
      normal: 'Estou bem!',
      fome: 'Estou com fome!',
      coco: 'Fiz cocô...',
      feliz: 'Obrigado!',
    };

    setFala(mensagens[estadoPet] || '');

    // Oculta a fala após 2 segundos
    const timer = setTimeout(() => setFala(''), 2000);
    return () => clearTimeout(timer);
  }, [estadoPet]);

  // Após um tempo, o pet fica com fome automaticamente
  useEffect(() => {
    const tempoParaFicarComFome = setTimeout(() => {
      setEstadoPet('fome');
    }, 8000);

    return () => clearTimeout(tempoParaFicarComFome);
  }, [estadoPet]);

  // Função chamada ao alimentar o pet
  function alimentarPet() {
    setEstadoPet('feliz');
    setQuantidadeCoco(prev => prev + 1);

    // Após 6 segundos, ele faz cocô
    setTimeout(() => {
      setEstadoPet('coco');
    }, 6000);
  }

  // Limpa todos os cocôs
  function limparCoco() {
    setQuantidadeCoco(0);
    setEstadoPet('normal');
  }

  // Alterna entre os fundos
  function trocarFundo() {
    const proximoFundo = (fundoAtual + 1) % fundos.length;
    setFundoAtual(proximoFundo);
  }

  // Alterna entre os chapéus
  function trocarChapeu() {
    const proximoChapeu = (chapeuAtual + 1) % chapeus.length;
    setChapeuAtual(proximoChapeu);
  }

  // Imagens diferentes para cada estado do pet
  const imagemPet = {
    normal: require('./assets/gifs/petChild.gif'),
    fome: require('./assets/gifs/petChildCry.gif'),
    coco: require('./assets/gifs/petChild.gif'),
    feliz: require('./assets/gifs/petChild.gif'),
  };

  // Efeitos visuais
  const efeitos = {
    coracao: require('./assets/gifs/petBigSparkles.gif'),
    brilho: require('./assets/gifs/petSparkles.gif'),
    coco: require('./assets/gifs/petPoo.gif'),
  };

  return (
    <View style={estilos.tela}>
      {/* Fundo atual */}
      <Image source={fundos[fundoAtual]} style={estilos.fundo} />

      {/* Botão de trocar fundo */}
      <TouchableOpacity onPress={trocarFundo} style={[estilos.pincelBtn, { transform: [{ rotate: '-20deg' }] }]}>
        <Image source={require('./assets/icones/spray.png')} style={estilos.imagempincel} />
      </TouchableOpacity>

      {/* Botão de trocar chapéu */}
      <TouchableOpacity onPress={trocarChapeu} style={estilos.botaoChapeu}>
        <Image source={require('./assets/icones/cabide.png')} style={estilos.imagemBotao} />
      </TouchableOpacity>

      {/* Botões de ação: alimentar e limpar */}
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

      {/* Balão de fala */}
      {fala !== '' && (
        <View style={estilos.containerBalao}>
          <ImageBackground
            source={require('./assets/balao/balao2.png')}
            style={estilos.balaoPixel}
            resizeMode="stretch"
          >
            <Text style={estilos.textoPixel}>{fala}</Text>
          </ImageBackground>
        </View>
      )}

      {/* Área do pet */}
      <View style={estilos.areaPet}>
        {/* Chapéu atual, se houver */}
        {chapeus[chapeuAtual] && (
          <Image source={chapeus[chapeuAtual]} style={estilos.chapeu} />
        )}

        {/* Imagem do pet conforme o estado */}
        <Image source={imagemPet[estadoPet]} style={estilos.imagemPet} />

        {/* Efeito de coração quando está feliz */}
        {estadoPet === 'feliz' && (
          <Image source={efeitos.coracao} style={estilos.efeito} />
        )}

        {/* Mostrar cocôs acumulados */}
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
    bottom: 70,
    alignItems: 'center',
  },
  imagemPet: {
    width: 170,
    height: 170,
  },
  chapeu: {
    position: 'absolute',
    top: -30, // ajustado para ficar acima da cabeça do pet
    width: 120,
    height: 120,
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
    top: '38%',
    alignSelf: 'center',
    alignItems: 'flex-start',
    zIndex: 5,
  },
  balaoPixel: {
    width: 180,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
  },
  textoPixel: {
    color: '#000',
    fontSize: 10,
    fontFamily: 'pixel',
    textAlign: 'center',
    lineHeight: 12,
  },
});
