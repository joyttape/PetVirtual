import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import * as Font from 'expo-font';

export default function App() {
  // Estado do pet: como ele está se sentindo
  const [estadoPet, setEstadoPet] = useState('normal');
  // Texto visível no balão
  const [fala, setFala] = useState('');
  // Fonte carregada (pixel)
  const [fonteCarregada, setFonteCarregada] = useState(false);

  // Carrega a fonte uma vez só
  useEffect(() => {
    async function carregarFonte() {
      await Font.loadAsync({
        pixel: require('./assets/fonts/PressStart2P-Regular.ttf'),
      });
      setFonteCarregada(true);
    }
    carregarFonte();
  }, []);

  // Muda o texto da fala sempre que o estado do pet mudar
  useEffect(() => {
    const falas = {
      normal: 'Estou bem!',
      fome: 'Estou com fome!',
      coco: 'Fiz cocô...',
      feliz: 'Obrigado!',
    };

    const novaFala = falas[estadoPet] || '';
    setFala(novaFala);

    // Depois de 2 segundos, esconde o balão
    const timer = setTimeout(() => {
      setFala('');
    }, 2000);

    return () => clearTimeout(timer);
  }, [estadoPet]);

  // Após um tempo no estado "normal", o pet fica com fome
  useEffect(() => {
    if (estadoPet === 'normal') {
      const tempo = setTimeout(() => {
        setEstadoPet('fome');
      }, 5000);
      return () => clearTimeout(tempo);
    }
  }, [estadoPet]);

  // Função que alimenta o pet
  const alimentarPet = () => {
    setEstadoPet('feliz');
    setTimeout(() => setEstadoPet('coco'), 6000);
  };

  // Função que limpa o cocô
  const limparCoco = () => {
    setEstadoPet('normal');
  };

  // Imagens do pet em cada estado
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
      <Image source={require('./assets/fundo2.png')} style={estilos.fundo} />

      <View style={estilos.botoesContainer}>
        {/* Botão de comida */}
        <TouchableOpacity
          onPress={alimentarPet}
          disabled={estadoPet !== 'fome'}
          style={[
            estilos.botao,
            estilos.botaoComida,
            estadoPet !== 'fome' && estilos.botaoDesativado,
          ]}
        >
          <Image source={require('./assets/comida.png')} style={estilos.imagemBotao} />
        </TouchableOpacity>

        {/* Botão de limpeza */}
        <TouchableOpacity
          onPress={limparCoco}
          disabled={estadoPet !== 'coco'}
          style={[
            estilos.botao,
            estilos.botaoLimpar,
            estadoPet !== 'coco' && estilos.botaoDesativado,
          ]}
        >
          <Image source={require('./assets/limpar.png')} style={estilos.imagemBotao} />
        </TouchableOpacity>
      </View>

      {/* Balão de fala */}
      {fala !== '' && (
        <View style={estilos.containerBalao}>
          <ImageBackground
            source={require('./assets/balao2.png')}
            style={estilos.balaoPixel}
            resizeMode="stretch"
          >
            <Text style={estilos.textoPixel}>{fala}</Text>
          </ImageBackground>
        </View>
      )}

      {/* Pet e efeitos */}
      <View style={estilos.areaPet}>
        <Image source={imagemPet[estadoPet]} style={estilos.imagemPet} />

        {estadoPet === 'feliz' && (
          <Image source={efeitos.brilho} style={estilos.efeito} />
        )}

        {estadoPet === 'coco' && (
          <Image source={efeitos.coco} style={estilos.efeitoCoco} />
        )}

        {estadoPet === 'feliz' && (
          <Image source={efeitos.coracao} style={estilos.efeito} />
        )}
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
    zIndex: -1,
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
    width: 40,
    height: 40,
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
    left: 100,
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