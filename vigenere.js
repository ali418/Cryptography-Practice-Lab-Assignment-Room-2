// Part 3: Vigenère Cipher Implementation

// Exercise 3.2: Implement Vigenère Cipher
// Note: This implementation converts text to uppercase and removes non-alphabetic characters

// Function to encrypt text using Vigenère Cipher
function vigenereEncrypt(plaintext, keyword) {
    let result = ''; // Initialize an empty string to store the encrypted result
    let keyIndex = 0; // Initialize index to track position in the keyword
    
    // Clean input: Convert plaintext to uppercase and remove any character that is NOT A-Z
    plaintext = plaintext.toUpperCase().replace(/[^A-Z]/g, '');
    // Convert keyword to uppercase to ensure consistent ASCII calculations
    keyword = keyword.toUpperCase();
    
    // Loop through each character of the cleaned plaintext
    for (let i = 0; i < plaintext.length; i++) {
        // Get the 0-25 position of the current plaintext character (A=0, B=1, etc.)
        // charCodeAt(i) gets ASCII value, subtracting 65 converts 'A' (65) to 0
        let plainPos = plaintext.charCodeAt(i) - 65;
        
        // Get the 0-25 position of the corresponding keyword character
        // keyIndex % keyword.length ensures we cycle through the keyword repeatedly (e.g., LEMONLEMON...)
        let keyPos = keyword.charCodeAt(keyIndex % keyword.length) - 65;
        
        // Calculate the new encrypted position: (plaintext position + keyword position) modulo 26
        // Modulo 26 ensures the result wraps around the alphabet (Z -> A)
        let newPos = (plainPos + keyPos) % 26;
        
        // Convert the new numeric position back to a character
        // Adding 65 converts 0 back to 'A', 1 back to 'B', etc.
        result += String.fromCharCode(newPos + 65);
        
        // Move to the next letter in the keyword for the next iteration
        keyIndex++;
    }
    // Return the final encrypted string
    return result;
}

// Helper function for decryption (Logic reversed)
function vigenereDecrypt(ciphertext, keyword) {
    let result = ''; // Initialize result string
    let keyIndex = 0; // Initialize keyword index
    
    // Clean input: Uppercase and keep only letters
    ciphertext = ciphertext.toUpperCase().replace(/[^A-Z]/g, '');
    keyword = keyword.toUpperCase();
    
    // Loop through each character of the ciphertext
    for (let i = 0; i < ciphertext.length; i++) {
        // Get 0-25 position of current cipher character
        let cipherPos = ciphertext.charCodeAt(i) - 65;
        // Get 0-25 position of current keyword character (cycling with modulo)
        let keyPos = keyword.charCodeAt(keyIndex % keyword.length) - 65;
        
        // Decrypt logic: (Cipher - Key)
        // We add 26 before modulo to handle negative results (e.g., 0 - 5 = -5 -> +26 = 21)
        let newPos = (cipherPos - keyPos + 26) % 26;
        
        // Convert number back to character and append to result
        result += String.fromCharCode(newPos + 65);
        
        // Advance keyword index
        keyIndex++;
    }
    return result;
}

// --- Testing ---
console.log("--- Vigenère Cipher Tests (Exercise 3.2) ---");

// Test Case 1: ATTACK with LEMON
const plain1 = "ATTACK";
const key1 = "LEMON";
// Call encrypt function
const cipher1 = vigenereEncrypt(plain1, key1);

console.log(`Test 1: Encrypt "${plain1}" with key "${key1}"`);
console.log(`Expected: LXFOPV`);
console.log(`Actual:   ${cipher1}`);

// Check if result matches expectation
if (cipher1 === "LXFOPV") {
    console.log("\x1b[32m[PASS]\x1b[0m"); // Print PASS in green
} else {
    console.log("\x1b[31m[FAIL]\x1b[0m"); // Print FAIL in red
}

// Test Case 2: Decrypt check
// Call decrypt function on the result from Test 1
const decrypted1 = vigenereDecrypt(cipher1, key1);
console.log(`Decrypting back: ${decrypted1}`);

// Verify if we got the original text back
if (decrypted1 === plain1) {
    console.log("\x1b[32m[PASS]\x1b[0m");
} else {
    console.log("\x1b[31m[FAIL]\x1b[0m");
}
