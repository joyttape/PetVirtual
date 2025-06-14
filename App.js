import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import * as Font from 'expo-font';

export default function App() {
  const [estadoPet, setEstadoPet] = useState('normal');
  const [fala, setFala] = useState('');
  const [fonteCarregada, setFonteCarregada] = useState(false);
  const [fundos] = useState([
    require('./assets/fundos/fundo1.jpg'),
    require('./assets/fundos/fundo2.jpg'),
    require('./assets/fundos/fundo3.jpg'),
  ]);
  const [fundoAtual, setFundoAtual] = useState(0);
  const [quantidadeCoco, setQuantidadeCoco] = useState(0);
  const chapeus = [
    null,
    require('./assets/chapeus/chapeu1.png'),
    require('./assets/chapeus/chapeu2.png'),
  ];
  const [chapeuAtual, setChapeuAtual] = useState(0);

  useEffect(() => {
    async function carregarFonte() {
      await Font.loadAsync({
        pixel: require('./assets/fonts/PressStart2P-Regular.ttf'),
      });
      setFonteCarregada(true);
    }
    carregarFonte();
  }, []);

  useEffect(() => {
    const falas = {
      normal: 'Estou bem!',
      fome: 'Estou com fome!',
      coco: 'Fiz cocô...',
      feliz: 'Obrigado!',
    };
    const novaFala = falas[estadoPet] || '';
    setFala(novaFala);

    const timer = setTimeout(() => {
      setFala('');
    }, 2000);
    return () => clearTimeout(timer);
  }, [estadoPet]);

  useEffect(() => {
    const tempo = setTimeout(() => {
      setEstadoPet('fome');
    }, 8000);
    return () => clearTimeout(tempo);
  }, [estadoPet]);

  const alimentarPet = () => {
    setEstadoPet('feliz');
    setQuantidadeCoco(prev => prev + 1);
    setTimeout(() => setEstadoPet('coco'), 6000);
  };

  const limparCoco = () => {
    setQuantidadeCoco(0);
    setEstadoPet('normal');
  };

  const trocarFundo = () => {
    setFundoAtual((fundoAtual + 1) % fundos.length);
  };

  const trocarChapeu = () => {
    setChapeuAtual((chapeuAtual + 1) % chapeus.length);
  };

  const imagemPet = {
    normal: require('./assets/gifs/petChild.gif'),
    fome: require('./assets/gifs/petChildCry.gif'),
    coco: require('./assets/gifs/petChild.gif'),
    feliz: require('./assets/gifs/petChild.gif'),
  };

  const efeitos = {
    coracao: require('./assets/gifs/petBigSparkles.gif'),
    brilho: require('./assets/gifs/petSparkles.gif'),
    coco: require('./assets/gifs/petPoo.gif'),
  };

  return (
    <View style={estilos.tela}>
      <Image source={fundos[fundoAtual]} style={estilos.fundo} />

      <TouchableOpacity
        onPress={trocarFundo}
        style={[estilos.pincelBtn, { transform: [{ rotate: '-20deg' }] }]}
      >
        <Image source={require('./assets/icones/spray.png')} style={estilos.imagempincel} />
      </TouchableOpacity>

      {/* Botão para trocar chapéu */}
      <TouchableOpacity onPress={trocarChapeu} style={estilos.botaoChapeu}>
        <Image source={require('./assets/icones/cabide.png')} style={estilos.imagemBotao} />
      </TouchableOpacity>

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

      <View style={estilos.areaPet}>
        {chapeus[chapeuAtual] && (
          <Image source={chapeus[chapeuAtual]} style={estilos.chapeu} />
        )}
        <Image source={imagemPet[estadoPet]} style={estilos.imagemPet} />

        {estadoPet === 'feliz' && (
          <Image source={efeitos.coracao} style={estilos.efeito} />
        )}

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
