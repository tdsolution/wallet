import { ethers } from "ethers";

// Định nghĩa các tham số cho hàm swap
interface SwapParams {
  providerUrl: string;
  privateKey: string;
  contractAddress: string;
  amountInETH: string;
  minTokens: string;
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
        gasLimit: 30000, // Giới hạn gas (có thể cần điều chỉnh)
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

// Định nghĩa các tham số cho hàm transfer
interface TransferParams {
  providerUrl: string;
  privateKey: string;
  recipientAddress: string;
  amount: string;
}
// Hàm transfer để chuyển tiền
export const transfer = async ({
  providerUrl,
  privateKey,
  recipientAddress,
  amount,
}: TransferParams): Promise<boolean> => {
  // Kết nối với mạng Ethereum thông qua URL của provider
  const provider = new ethers.JsonRpcProvider(providerUrl);

  // Khởi tạo ví từ khóa riêng
  const wallet = new ethers.Wallet(privateKey, provider);

  try {
    // Chuyển đổi số lượng tiền sang đơn vị wei
    const value = ethers.parseEther(amount);

    // Tạo giao dịch
    const transaction = {
      to: recipientAddress,
      value,
    };

    // Gửi giao dịch
    const tx = await wallet.sendTransaction(transaction);
    console.log("Transaction Hash:", tx.hash);

    // Chờ giao dịch được xác nhận
    const receipt = await tx.wait();
    console.log("Transaction confirmed:", receipt);
    return true;
  } catch (error) {
    console.error("Transaction failed:", error);
    return false;
  }
};

// Định nghĩa các tham số cho hàm withdraw
interface WithdrawParams {
  providerUrl: string;
  privateKey: string;
  contractAddress: string;
  recipientAddress: string;
  amount: string;
}

// Hàm withdraw để rút tiền từ ví token sang ví Ethereum
export const withdraw = async ({
  providerUrl,
  privateKey,
  contractAddress,
  recipientAddress,
  amount,
}: WithdrawParams): Promise<boolean> => {
  // Kết nối với mạng Ethereum thông qua URL của provider
  const provider = new ethers.JsonRpcProvider(providerUrl);

  // Khởi tạo ví từ khóa riêng
  const wallet = new ethers.Wallet(privateKey, provider);

  // ABI của hợp đồng thông minh
  const contractABI = ["function withdraw(uint256 amount) public"];

  // Khởi tạo đối tượng hợp đồng
  const contract = new ethers.Contract(contractAddress, contractABI, wallet);

  try {
    // Gọi hàm withdraw trong hợp đồng thông minh
    const transaction = await contract.withdraw(ethers.parseUnits(amount, 18), {
      gasLimit: 200000, // Giới hạn gas (có thể cần điều chỉnh)
    });
    console.log("Transaction sent:", transaction);

    // Chờ giao dịch được xác nhận
    const receipt = await transaction.wait();
    console.log("Transaction mined:", receipt);
    return true;
  } catch (error) {
    console.error("Error during withdrawal:", error);
    return false;
  }
};
