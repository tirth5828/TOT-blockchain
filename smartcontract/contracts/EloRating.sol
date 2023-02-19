pragma solidity ^0.5.0;

// Import OpenZeppelin ERC20 implementation
import "@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol";

contract EloRating {
    // Define the Elo rating constants
    uint constant public K = 32;
    uint constant public BASE_RATING = 1000;
    
    // Define the mapping for storing user ratings
    mapping(address => uint) public ratings;
    
    // Define the ERC20 token contract
    ERC20Mintable public tokenContract;
    
    // Define the token amount for each rating change
    uint constant public TOKEN_RATE = 25; // 0.0025 tokens per rating point
    
    // Define the mapping for storing user token balances
    mapping(address => uint) public tokenBalances;
    
    // Define the monthly withdrawal period (in seconds)
    uint constant public WITHDRAWAL_PERIOD = 2592000; // 30 days
    
    // Define the mapping for storing user withdrawal timestamps
    mapping(address => uint) public withdrawalTimestamps;
    
    // Define the constructor to initialize the token contract
    constructor(address _tokenAddress) public {
        tokenContract = ERC20Mintable(_tokenAddress);
    }
    
    // Define the function for calculating the expected score
    function getExpectedScore(uint playerRating, uint opponentRating) public pure returns (uint) {
        return 1 / (1 + 10**((opponentRating - playerRating) / 400));
    }
    
    // Define the function for updating the ratings based on the game outcome
    function updateRating(address player, uint easy, uint medium, uint hard) public {
        require(player != address(0), "Player cant be zero address");

        uint tokenAmount = 0;
        uint playerRating = ratings[player];

        uint opponentRating = 1000;
        for (uint256 i = 0; i < easy ; i++) {   
            uint expectedScore = getExpectedScore(playerRating, opponentRating);
            uint newPlayerRating = playerRating + K * (1 - expectedScore);
            
            // Check if the new rating is negative
            if (newPlayerRating < 0) {
                newPlayerRating = 0;
            }
            
            // Calculate the rating change and update the player's rating
            int ratingChange = int(newPlayerRating) - int(playerRating);
            playerRating = newPlayerRating;
            
            // Calculate the token amount based on the rating change
            tokenAmount += (ratingChange > 0) ? uint(ratingChange) * TOKEN_RATE : 0;
        }

        opponentRating = 1500;
        for (uint256 i = 0; i < medium ; i++) {   
            uint expectedScore = getExpectedScore(playerRating, opponentRating);
            uint newPlayerRating = playerRating + K * (1 - expectedScore);
            
            // Check if the new rating is negative
            if (newPlayerRating < 0) {
                newPlayerRating = 0;
            }
            
            // Calculate the rating change and update the player's rating
            int ratingChange = int(newPlayerRating) - int(playerRating);
            playerRating = newPlayerRating;
            
            // Calculate the token amount based on the rating change
            tokenAmount += (ratingChange > 0) ? uint(ratingChange) * TOKEN_RATE : 0;
        }

        opponentRating = 2000;
        for (uint256 i = 0; i < hard ; i++) {   
            uint expectedScore = getExpectedScore(playerRating, opponentRating);
            uint newPlayerRating = playerRating + K * (1 - expectedScore);
            
            // Check if the new rating is negative
            if (newPlayerRating < 0) {
                newPlayerRating = 0;
            }
            
            // Calculate the rating change and update the player's rating
            int ratingChange = int(newPlayerRating) - int(playerRating);
            playerRating = newPlayerRating;
            
            // Calculate the token amount based on the rating change
            tokenAmount += (ratingChange > 0) ? uint(ratingChange) * TOKEN_RATE : 0;
        }
        
        ratings[player] = playerRating;
        // Update the user's token balance
        tokenBalances[player] += tokenAmount;

        // Update the user's withdrawal timestamp
        withdrawalTimestamps[player] = block.timestamp + WITHDRAWAL_PERIOD;
    }
    
    // Define the function for allowing users to withdraw their tokens
    function withdrawTokens() public {
        require(tokenBalances[msg.sender] > 0, "No tokens to withdraw");
        // require(block.timestamp >= withdrawalTimestamps[msg.sender], "Withdrawal period not over");
        uint tokenAmount = tokenBalances[msg.sender];
        tokenBalances[msg.sender] = 0;
        tokenContract.mint(msg.sender, tokenAmount);
    }
    
}
