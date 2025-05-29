import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';


export default function App() {
  const [estado, setEstado] = useState('normal');
  
  // Configurações do pet
  const imagensPet = {
    normal: require('./assets/gifs/petChild.gif'),
    fome: require('./assets/gifs/petChildCry.gif'),
    comeu: require('./assets/gifs/petChild.gif'),
    coco: require('./assets/gifs/petChild.gif'),
    feliz: require('./assets/gifs/petChild.gif'),
  };

  const efeitos = {
    coracao: require('./assets/gifs/petBigSparkles.gif'),
    brilho: require('./assets/gifs/petSparkles.gif'),
    cocozinho: require('./assets/gifs/petPoo.gif'),
  };

  const frases = {
    normal: 'Estou bem!',
    fome: 'Estou com fome!',
    coco: 'Fiz cocô...',
    feliz: 'Obrigado!',
  };

  // Lógica automática
  useEffect(() => {
    if (estado === 'normal') {
      const timer = setTimeout(() => setEstado('fome'), 5000);
      return () => clearTimeout(timer);
    }
  }, [estado]);

  // Ações do usuário
  const alimentar = () => {
    setEstado('comeu');
    setTimeout(() => setEstado('coco'), 2000);
  };

  const limpar = () => {
    setEstado('feliz');
    setTimeout(() => setEstado('normal'), 3000);
  };

  // Componente de Botão Reutilizável
  const BotaoAcao = ({ imagem, aoPressionar, desativado, estilo }) => (
    <TouchableOpacity
      onPress={aoPressionar}
      disabled={desativado}
      style={[estilos.botao, estilo, desativado && estilos.botaoDesativado]}
    >
      <Image source={imagem} style={estilos.imagemBotao} />
    </TouchableOpacity>
  );

  return (
    <View style={estilos.tela}>
      {/* Fundo */}
      <Image source={require('./assets/fundo5.jpg')} style={estilos.fundo} />
      
      {/* Cabeçalho */}
      <View style={estilos.cabecalho}>
        <Text style={estilos.titulo}>Meu Pet Virtual</Text>
        
        <View style={estilos.botoes}>
          <BotaoAcao
            imagem={require('./assets/comida.png')}
            aoPressionar={alimentar}
            desativado={estado !== 'fome'}
            estilo={estilos.botaoComida}
          />
          
          <BotaoAcao
            imagem={require('./assets/limpar.png')}
            aoPressionar={limpar}
            desativado={estado !== 'coco'}
            estilo={estilos.botaoLimpar}
          />
        </View>
      </View>

      {/* Área do Pet */}
      <View style={estilos.areaPet}>
        <Image source={imagensPet[estado]} style={estilos.imagemPet} />
        
        {/* Efeitos especiais */}
        {estado === 'comeu' && (
          <Image source={efeitos.coracao} style={estilos.efeito} />
        )}
        {estado === 'feliz' && (
          <Image source={efeitos.brilho} style={estilos.efeito} />
        )}
        {estado === 'coco' && (
          <Image source={efeitos.cocozinho} style={estilos.efeitoCoco} />
        )}
      </View>

      {/* Mensagem do Pet */}
      <Text style={estilos.mensagem}>{frases[estado]}</Text>
    </View>
  );
}

// Estilos da página
const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    alignItems: 'center'
  },
  fundo: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    zIndex: -1
  },
  cabecalho: {
    marginTop: 130,
    alignItems: 'center'
  },
  titulo: {
    fontSize: 26,
    fontFamily: 'font',
    color: '#FFF',
    backgroundColor: '#000',
    padding: 10,
    margin: 10
  },
  botoes: {
    flexDirection: 'row',
    margin: 20
  },
  botao: {
    width: 70,
    height: 70,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderWidth: 4
  },
  botaoComida: {
    backgroundColor: '#f0c9b8',
    borderColor: '#d06a36'
  },
  botaoLimpar: {
    backgroundColor: '#FFF',
    borderColor: '#b3bcec'
  },
  botaoDesativado: {
    opacity: 0.4
  },
  imagemBotao: {
    width: 40,
    height: 40
  },
  areaPet: {
    position: 'absolute',
    bottom: 150,
    alignItems: 'center'
  },
  imagemPet: {
    width: 170,
    height: 170
  },
  efeito: {
    position: 'absolute',
    width: 50,
    height: 50,
    top: 60,
    left: 120
  },
  efeitoCoco: {
    width: 80,
    height: 80,
    bottom: 10,
    left: 100
  },
  mensagem: {
    fontSize: 18,
    marginVertical: 20,
    color: '#FFF',
    backgroundColor: '#000',
    padding: 10
  }
});