import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import * as Font from 'expo-font';

// Componente principal do aplicativo
export default function App() {
  // Estado do pet (pode ser: normal, fome, feliz ou coco)
  const [estadoPet, setEstadoPet] = useState('normal');

  // Texto que aparece no balão de fala
  const [fala, setFala] = useState('');

  // Verifica se a fonte foi carregada
  const [fonteCarregada, setFonteCarregada] = useState(false);

  // Guarda o tempo de fala atual para cancelar depois se necessário
  const falaTimeout = useRef(null);

  // Nome do pet
  const [nomePet, setNomePet] = useState('Amber');

  // Fundo atual sendo exibido
  const [fundoAtual, setFundoAtual] = useState(0);

  // Quantidade de cocôs acumulados
  const [quantidadeCoco, setQuantidadeCoco] = useState(0);

  // Chapéu atual (posição na lista)
  const [chapeuAtual, setChapeuAtual] = useState(0);

  // Tempo para o pet sentir fome (em milissegundos)
  const TEMPO_PARA_SENTIR_FOME = 9000;

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

  // Lista de chapéus (imagens)
  const chapeus = [
    null,
    require('./assets/chapeus/chapeu7.png'),
    require('./assets/chapeus/chapeu5.png'),
    require('./assets/chapeus/chapeu6.png'),
  ];

  // Tamanhos e posições diferentes para cada chapéu
  const estilosChapeus = {
    1: { width: 200, height: 130, top: -50 },
    2: { width: 130, height: 100, top: -50 },
    3: { width: 100, height: 99, top: -45 },
  };

  // Falas do pet para cada estado
  const mensagens = {
    normal: ['Estou bem!', 'Adoro esse lugar!', 'Tudo tranquilo.'],
    fome: ['Estou com fome!', 'Me dá comida!', 'Preciso comer!'],
    coco: ['Fiz cocô...', 'Ops... sujou!', 'Alguém limpa isso?'],
    feliz: ['Obrigado!', 'Amei isso!', 'Delícia!'],
  };

  // Imagens do pet para cada estado
  const imagemPet = {
    normal: require('./assets/gifs/petChild.gif'),
    fome: require('./assets/gifs/petChildCry.gif'),
    coco: require('./assets/gifs/petChild.gif'),
    feliz: require('./assets/gifs/petChild.gif'),
  };

  // Efeitos visuais animados
  const efeitos = {
    coracao: require('./assets/gifs/petBigSparkles.gif'),
    coco: require('./assets/gifs/petPoo.gif'),
  };

  // Carrega a fonte pixelada ao abrir o app
  useEffect(() => {
    async function carregarFonte() {
      await Font.loadAsync({
        pixel: require('./assets/fonts/PressStart2P-Regular.ttf'),
      });
      setFonteCarregada(true);
    }
    carregarFonte();
  }, []);

  // Muda o texto do balão de fala quando o estado do pet muda
  useEffect(() => {
    const opcoes = mensagens[estadoPet] || [''];
    const falaAleatoria = opcoes[Math.floor(Math.random() * opcoes.length)];
    setFala(falaAleatoria);

    // Limpa o balão depois de 2 segundos
    if (falaTimeout.current) clearTimeout(falaTimeout.current);
    falaTimeout.current = setTimeout(() => setFala(''), 2000);

    return () => clearTimeout(falaTimeout.current);
  }, [estadoPet]);

  // Se o pet estiver normal, depois de um tempo ele sente fome
  useEffect(() => {
    if (estadoPet !== 'normal') return;

    const id = setTimeout(() => {
      setEstadoPet('fome');
    }, TEMPO_PARA_SENTIR_FOME);

    return () => clearTimeout(id);
  }, [estadoPet]);

  // Alimenta o pet (se estiver com fome ou sujo)
  function alimentarPet() {
    if (estadoPet === 'fome' || estadoPet === 'coco') {
      setEstadoPet('feliz');

      // Depois de 8 segundos, ele faz cocô
      setTimeout(() => {
        setQuantidadeCoco(prev => prev + 1);
        setEstadoPet('coco');
      }, 8000);
    }
  }

  // Limpa os cocôs e deixa o pet normal
  function limparCoco() {
    setQuantidadeCoco(0);
    setEstadoPet('normal');
  }

  // Troca o fundo da tela
  function trocarFundo() {
    setFundoAtual((fundoAtual + 1) % fundos.length);
  }

  // Troca o chapéu do pet
  function trocarChapeu() {
    setChapeuAtual((chapeuAtual + 1) % chapeus.length);
  }

  // Se a fonte ainda não carregou, não mostra nada (evita erro visual)
  if (!fonteCarregada) return null;

  return (
    <View style={estilos.tela}>
      {/* Fundo da tela */}
      <Image source={fundos[fundoAtual]} style={estilos.fundo} />

      {/* Botão para trocar o fundo */}
      <TouchableOpacity onPress={trocarFundo} style={estilos.pincelBtn}>
        <Image source={require('./assets/icones/spray.png')} style={estilos.imagempincel} />
      </TouchableOpacity>

      {/* Botão para trocar o chapéu */}
      <TouchableOpacity onPress={trocarChapeu} style={estilos.botaoChapeu}>
        <Image source={require('./assets/icones/cabide.png')} style={estilos.imagemBotao} />
      </TouchableOpacity>

      {/* Botões de alimentar e limpar */}
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

      {/* Parte principal do pet */}
      <View style={estilos.areaPet}>
        <Text style={estilos.nomePet}>{nomePet}</Text>

        {/* Chapéu do pet, se tiver */}
        {chapeus[chapeuAtual] && (
          <Image
            source={chapeus[chapeuAtual]}
            style={[estilos.chapeu, estilosChapeus[chapeuAtual]]}
          />
        )}

        {/* Imagem animada do pet */}
        <Image source={imagemPet[estadoPet]} style={estilos.imagemPet} />

        {/* Coração aparece quando está feliz */}
        {estadoPet === 'feliz' && (
          <Image source={efeitos.coracao} style={estilos.efeito} />
        )}

        {/* Mostrar cocôs acumulados */}
        {Array.from({ length: quantidadeCoco }).map((_, index) => (
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
  bottom: -20,
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
},
});
