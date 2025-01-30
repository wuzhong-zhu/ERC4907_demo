var web3
var accounts
var contractABI = [{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"name_","type":"string"},{"internalType":"string","name":"symbol_","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address","name":"owner","type":"address"}],"name":"ERC721IncorrectOwner","type":"error"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ERC721InsufficientApproval","type":"error"},{"inputs":[{"internalType":"address","name":"approver","type":"address"}],"name":"ERC721InvalidApprover","type":"error"},{"inputs":[{"internalType":"address","name":"operator","type":"address"}],"name":"ERC721InvalidOperator","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"ERC721InvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"ERC721InvalidReceiver","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"ERC721InvalidSender","type":"error"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ERC721NonexistentToken","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address","name":"user","type":"address"},{"internalType":"uint64","name":"expires","type":"uint64"}],"name":"setUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint64","name":"expires","type":"uint64"}],"name":"UpdateUser","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"userExpires","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"userOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]
var contract
var timerStarted = false

$("#connectMM").on("click",function(){
    console.log("connecting to Metamask!")
	if (window.ethereum) {
        // use the injected Ethereum provider to initialize Web3.js
        web3 = new Web3(window.ethereum);

        // check if Ethereum provider comes from MetaMask
        if (window.ethereum.isMetaMask) {
            console.log('Connected to Ethereum with MetaMask.');
            getAccount()
            console.log(accounts)
            $("#divTop").show()
        } else {
            console.log('Non-MetaMask Ethereum provider detected.');
            alert("Non-MetaMask Ethereum provider detected.")
        }
    }
});

$("#retrieInfo").on("click",async function(){
    $("#bottomDiv").empty()
    {
        console.log(window.ethereum.isMetaMask)
        var chainID = await web3.eth.getChainId()
        console.log(chainID)
        const contractAddress = $("#address").val();
        contract = new web3.eth.Contract(contractABI, contractAddress);
    
        var name = await contract.methods.name().call()
        var symbol = await contract.methods.symbol().call()
        console.log(name)
        var tokens = []
        var tokenID = 0
        while(tokenID<=5){
            var owner = await contract.methods.ownerOf(tokenID).call()
            console.log(owner)
            var tokenURI = await contract.methods.tokenURI(tokenID).call()
            console.log(tokenURI)
            var user = await contract.methods.userOf(tokenID).call()
            if(user == "0x0000000000000000000000000000000000000000")
                user = "NA"
            console.log(user)
            var userExpires = await contract.methods.userExpires(tokenID).call()
            console.log(userExpires)
            if(userExpires == "0")
                userExpires = "NA"
            else
                userExpires = moment.unix(Number(userExpires)).format("MM/DD/YYYY");
            console.log(userExpires)

            $("#bottomDiv").append(
                '<div class="NFTInfo" id=token"'+tokenID+'">'+'</br>'+
                    '<img src="'+tokenURI+'" class="NFTPic"/>'+
                    '<p id="'+tokenID+'ownerInfo">Owner : '+owner+'<p/>'+
                    '<p id="'+tokenID+'userInfo">User : '+user+'<p/>'+
                    '<p id="'+tokenID+'expiryInfo">Expiry time : '+userExpires+'<p/>'+
                    '<button class="rentBotton" value="'+tokenID+'">Rent this NFT to</button>'+
                '</div>'
            )

            tokens.push([owner,tokenURI,user,userExpires])
            tokenID ++
        }
        $(".rentBotton").on("click",async function(){
            var tokenID = $(this).attr("value")
            var position = $(this).offset()
            console.log(tokenID)
            $("body").append(
                '<div class="NFTRentalDiv" style="top:'+(position.top-100)+'px ;left:'+position.left+'px">'+
                    '<p1 style="font-weight: bold;"> Rent this NFT to: </p1>'+
                    '<input type="text" class="rentalAddress" id="'+tokenID+'rentalAddress" placeholder="Address for Rentable NFT" value="" /></br>'+
                    '<p1 style="font-weight: bold;"> Rental duration: </p1>'+
                    '<input type="text" class="rentalMonth" id="'+tokenID+'rentalMonth" placeholder="Month" value="" />'+
                    '<input type="text" class="rentalDay" id="'+tokenID+'rentalDay" placeholder="Day" value="" />'+
                    '<input type="text" class="rentalHour" id="'+tokenID+'rentalHour" placeholder="Hour" value="" />'+
                    '<input type="text" class="rentalMinute" id="'+tokenID+'rentalMinute" placeholder="Minute" value="" />'+
                    '<input type="text" class="rentalSecond" id="'+tokenID+'rentalSecond" placeholder="Second" value="" /></br></br>'+
                    '<button class="confirmRental" value="'+tokenID+'">confirm</button>'+
                    '<button class="cancelRental">cancel</button>'+
                '</div>'
            )

            $(".confirmRental").on("click",async function(){
                tokenID = $(this).val()
                var month = $("#"+tokenID+"rentalMonth").val()
                var day = $("#"+tokenID+"rentalDay").val()
                var hour = $("#"+tokenID+"rentalHour").val()
                var minute = $("#"+tokenID+"rentalMinute").val()
                var second = $("#"+tokenID+"rentalSecond").val()

                var address = $("#"+tokenID+"rentalAddress").val()
                var newDate= moment().add(month,'months').add(day,'days').add(hour,'hours').add(minute,'minutes').add(second,'seconds')

                console.log(newDate)
                console.log(newDate.format("X"))
                $(this).parent().remove()
                alert("Please proceed to confirm tx in metamask.")
                result = await contract.methods.setUser(tokenID,address,newDate.format("X")).send({from:accounts[0]})
            })

            $(".cancelRental").on("click",function(){
                $(this).parent().remove()
            })

        })
        console.log(tokens)
    }
    updateAllInfo()
});

async function getAccount() {
    accounts = await window.ethereum // Or window.ethereum if you don't support EIP-6963.
      .request({ method: "eth_requestAccounts" })
      .catch((err) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error.
          // If this happens, the user rejected the connection request.
          console.log("Please connect to MetaMask.")
        } else {
          console.error(err)
        }
      })
    console.log(accounts)
    $("#account").text(accounts[0])

  }

async function updateAllInfo(){
    if (timerStarted)
        return
    var tokenID = 0
    while(tokenID<=5){
        var owner = await contract.methods.ownerOf(tokenID).call()
        var user = await contract.methods.userOf(tokenID).call()
        if(user == "0x0000000000000000000000000000000000000000")
            user = "NA"
        console.log(user)
        var userExpires = await contract.methods.userExpires(tokenID).call()
        console.log(userExpires)
        if(userExpires == "0")
            userExpires = "NA"
        else
            userExpires = moment.unix(Number(userExpires)).format("MM/DD/YYYY");
        
        $("#"+tokenID+"ownerInfo").text("Owner : "+owner)
        $("#"+tokenID+"userInfo").text("User : "+user)
        $("#"+tokenID+"expiryInfo").text("Expiry time : "+userExpires)
        tokenID ++
    }
    window.setTimeout(updateAllInfo,10000);
}