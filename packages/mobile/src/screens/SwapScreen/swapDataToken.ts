import { ethers } from "ethers";

// Định nghĩa các tham số cho hàm swap
interface SwapParams {
  providerUrl: string;
  privateKey: string;
  contractAddress: string;
  amountInETH: string;
  minTokens: string;
}
interface TransferParams2 {
  providerUrl: string;
  privateKey: string;
  recipientAddress: string;
  amount: string; // Số lượng ETH muốn chuyển, dưới dạng chuỗi
}

// Định nghĩa các tham số cho hàm transfer
interface TransferParams {
  providerUrl: string;
  privateKey: string;
  contractAddress: string;
  recipientAddress: string;
  amount: string;
}
export const swapETHForTokens = async ({
  providerUrl,
  privateKey,
  contractAddress,
  amountInETH,
  minTokens,
}: SwapParams): Promise<void> => {
  // Kết nối với mạng Ethereum thông qua URL của provider
  const provider = new ethers.JsonRpcProvider(providerUrl);

  // Khởi tạo ví từ khóa riêng
  const wallet = new ethers.Wallet(privateKey, provider);

  // ABI của hợp đồng thông minh
  const contractABI = [
    "function swapETHForTokens(uint256 minTokens) public payable",
  ];

  // Khởi tạo đối tượng hợp đồng
  const contract = new ethers.Contract(contractAddress, contractABI, wallet);

  try {
    // Gọi hàm swapETHForTokens trong hợp đồng thông minh
    const transaction = await contract.swapETHForTokens(
      ethers.parseUnits(minTokens, 18),
      {
        value: ethers.parseEther(amountInETH), // Chuyển đổi số lượng ETH sang Wei
        gasLimit: 200000, // Giới hạn gas (có thể cần điều chỉnh)
      }
    );
    console.log("Transaction sent:", transaction);

    // Chờ giao dịch được xác nhận
    const receipt = await transaction.wait();
    console.log("Transaction mined:", receipt);
  } catch (error) {
    console.error("Error during token swap:", error);
  }
};

export const transferTokens = async ({
  providerUrl,
  privateKey,
  contractAddress,
  recipientAddress,
  amount,
}: TransferParams): Promise<void> => {
  // Kết nối với mạng Ethereum thông qua URL của provider
  const provider = new ethers.JsonRpcProvider(providerUrl);

  // Khởi tạo ví từ khóa riêng
  const wallet = new ethers.Wallet(privateKey, provider);

  // ABI của hợp đồng token (chuẩn ERC-20)
  const contractABI = [
    "function transfer(address to, uint amount) public returns (bool)",
    "function balanceOf(address account) view returns (uint256)",
  ];

  // Khởi tạo đối tượng hợp đồng
  const contract = new ethers.Contract(contractAddress, contractABI, wallet);

  try {
    // Gọi hàm transfer trong hợp đồng thông minh
    const transaction = await contract.transfer(
      recipientAddress,
      ethers.parseUnits(amount, 18)
    );
    console.log("Transaction sent:", transaction);

    // Chờ giao dịch được xác nhận
    const receipt = await transaction.wait();
    console.log("Transaction mined:", receipt);
  } catch (error) {
    console.error("Error during token transfer:", error);
  }
  //   ABI của hợp đồng token (chuẩn ERC-20)
};

export const swapTokensForETH = async ({
  providerUrl,
  privateKey,
  contractAddress,
  recipientAddress,
  amountInTokens,
  minETH,
}: any): Promise<void> => {
  // Kết nối với mạng Ethereum thông qua URL của provider
  const provider = new ethers.JsonRpcProvider(providerUrl);

  // Khởi tạo ví từ khóa riêng
  const wallet = new ethers.Wallet(privateKey, provider);

  // ABI của hợp đồng thông minh
  const contractABI = [
    "function swapTokensForETH(uint256 amountInTokens, uint256 minETH) public returns (uint256)",
  ];

  // Khởi tạo đối tượng hợp đồng
  const contract = new ethers.Contract(contractAddress, contractABI, wallet);

  try {
    // Chuyển đổi amountInTokens và minETH sang định dạng Wei
    const amountInTokensWei = ethers.parseUnits(amountInTokens, 18);
    const minETHWei = ethers.parseEther(minETH);

    // Gọi hàm swapTokensForETH trong hợp đồng thông minh
    const transaction = await contract.swapTokensForETH(
      amountInTokensWei,
      minETHWei,
      {
        gasLimit: 1000000, // Giới hạn gas (có thể cần điều chỉnh)
      }
    );
    console.log("Transaction sent:", transaction);

    // Chờ giao dịch được xác nhận
    const receipt = await transaction.wait();
    console.log("Transaction mined:", receipt);
  } catch (error) {
    console.error("Error during token swap:", error);
  }
};

// Thông tin cần thiết cho việc chuyển token
export const transferTokens2 = async ({
  providerUrl,
  privateKey,
  contractAddress,
  recipientAddress,
  amount,
}: {
  providerUrl: string;
  privateKey: string;
  contractAddress: string;
  recipientAddress: string;
  amount: string;
}): Promise<void> => {
  // Kết nối với mạng Ethereum thông qua URL của provider
  const provider = new ethers.JsonRpcProvider(providerUrl);

  // Khởi tạo ví từ khóa riêng
  const wallet = new ethers.Wallet(privateKey, provider);

  // ABI của hợp đồng token (chuẩn ERC-20)
  const contractABI = [
    "function transfer(address to, uint amount) public returns (bool)",
    "function balanceOf(address account) view returns (uint256)",
  ];

  // Khởi tạo đối tượng hợp đồng
  const contract = new ethers.Contract(contractAddress, contractABI, wallet);

  // Lấy địa chỉ của người gửi từ khóa riêng
  const senderAddress = wallet.address;

  // Kiểm tra xem địa chỉ gửi và địa chỉ nhận có giống nhau không
  if (senderAddress.toLowerCase() === recipientAddress.toLowerCase()) {
    console.error("Error: Sender and recipient addresses are the same.");
    return;
  }

  try {
    // Chuyển đổi số lượng token từ dạng thập phân sang Wei
    const tokenAmount = ethers.parseUnits(amount, 18);

    // Gọi hàm transfer trong hợp đồng thông minh
    const transaction = await contract.transfer(recipientAddress, tokenAmount);
    console.log("Transaction sent:", transaction);

    // Chờ giao dịch được xác nhận
    const receipt = await transaction.wait();
    console.log("Transaction mined:", receipt);
  } catch (error) {
    console.error("Error during token transfer:", error);
  }
};

export const transferTokens3 = async ({
  providerUrl,
  privateKey,
  contractAddress,
  recipientAddress,
  amount,
}: {
  providerUrl: string;
  privateKey: string;
  contractAddress: string;
  recipientAddress: string;
  amount: string;
}): Promise<void> => {
  // Kết nối với mạng Ethereum thông qua URL của provider
  const provider = new ethers.JsonRpcProvider(providerUrl);

  // Khởi tạo ví từ khóa riêng
  const wallet = new ethers.Wallet(privateKey, provider);

  // ABI của hợp đồng token (chuẩn ERC-20)
  const contractABI = [
    "function transfer(address to, uint amount) public returns (bool)",
    "function balanceOf(address account) view returns (uint256)",
  ];

  // Khởi tạo đối tượng hợp đồng
  const contract = new ethers.Contract(contractAddress, contractABI, wallet);

  // Lấy địa chỉ của người gửi từ khóa riêng
  const senderAddress = wallet.address;

  // Kiểm tra xem địa chỉ gửi và địa chỉ nhận có giống nhau không
  if (senderAddress.toLowerCase() === recipientAddress.toLowerCase()) {
    console.error("Error: Sender and recipient addresses are the same.");
    return;
  }

  try {
    // Chuyển đổi số lượng token từ dạng thập phân sang Wei
    const tokenAmount = ethers.parseUnits(amount, 18);

    // Gọi hàm transfer trong hợp đồng thông minh
    const transaction = await contract.transfer(recipientAddress, tokenAmount);
    console.log("Transaction sent:", transaction);

    // Chờ giao dịch được xác nhận
    const receipt = await transaction.wait();
    console.log("Transaction mined:", receipt);
  } catch (error) {
    console.error("Error during token transfer:", error);
  }
};
