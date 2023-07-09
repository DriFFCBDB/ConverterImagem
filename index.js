//A função retorna outra função chamada converter,com a lógica para converter um arquivo de imagem JPG em PNG.
const imgJpgToPng = (() => {
  //Criara uma tag <img>
    function criarTagImagem(propriedades) 
    {
      //verifica se o valor de  propriedades como undefined que caso for retorna um valor de um objeto vazio o qual irá substituí-lo
      propriedades = (typeof propriedades != 'undefined') ? propriedades : {};

      const img = document.createElement("img")
  
      // define a largura da imagem com base no valor de  propriedades.width ou propriedades.height se ele estiver presente e for verdadeiro, caso contrário, a largura será definida como "auto".
      img.style.width = `${propriedades.width ?? 'auto'}px`;
      img.style.height = `${propriedades.height ?? 'auto'}px`;
  
      // retorna a imagem criada com a largura e altura definidas
      return img
    }
  
    function converter(blobImg, propriedades) 
    {
      propriedades = (typeof propriedades != 'undefined') ? propriedades : {};
    
      // criar um elemento <canvas>
      const canvas = document.createElement("canvas")
      // permite a manipulação da imagem do tipo JPG.
      const renderizacaoCanvas = canvas.getContext("2d")
      const imageElement = criarTagImagem()
      const downloadLink = document.createElement("a")

      function atualizarLinkDowload(imgJpg, pngBlob) 
      {
        const linkElement = downloadLink
        const pngFileName = imgJpg.replace(/jpe?g/i, "png")
  
        linkElement.setAttribute("download", pngFileName)
        linkElement.href = URL.createObjectURL(pngBlob)
  
        downloadLink.click()
      }
  
      function process() {
        const imageUrl = URL.createObjectURL(blobImg)
  
        imageElement.addEventListener("load", e => {
          canvas.width = e.target.width
          canvas.height = e.target.height

          // permite desenhar a imagem no canvas em uma posição específica e com um tamanho específico.
          renderizacaoCanvas.drawImage(e.target, 0, 0, e.target.width, e.target.height)

          //OBSERVAÇÕES
          //e.target se refere à imagem carregada no elemento <img>
          //e o drawImage() é usado para desenhar essa imagem no contexto do canvas nas coordenadas (0, 0), ou seja, no canto superior esquerdo do canvas.
         
          //criar blob para conter os dados da imagem em formato JPG
          canvas.toBlob(
            atualizarLinkDowload.bind(window, blobImg.name),
            "imagem/png"
          )
        })
  
        imageElement.src = imageUrl
      }
  
      return { process: process, }
    }
  
    return converter
  })()
  

 var imgFileElemento = document.querySelector("label.img-upload input");
  
 imgFileElemento.addEventListener("change", event => {
     var blobImgJpg = event.currentTarget.files[0];

   if (blobImgJpg.type.match(/image\/jpe?g/i) != null) {
     imgJpgToPng(blobImgJpg).process()
   } else {
     alert(
       `Tipo de arquivo não válido! É necessário ser do tipo ${blobImgJpg.type}`
     )
   }
 });

