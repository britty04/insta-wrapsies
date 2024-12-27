export const verifyInstagramUsername = async (username: string): Promise<{ isValid: boolean; isPrivate?: boolean; profilePicUrl?: string }> => {
  try {
    // In a real implementation, this would call the Instagram API
    // For now, we'll simulate an API call with basic validation
    const response = await fetch(`https://www.instagram.com/${username}/?__a=1`);
    
    if (!response.ok) {
      return { isValid: false };
    }

    // Simulate API response
    const isValid = /^[a-zA-Z0-9._]{1,30}$/.test(username) && !username.includes('..');
    
    if (!isValid) {
      return { isValid: false };
    }

    // For development, generate a random avatar
    const profilePicUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;
    const isPrivate = Math.random() > 0.5;

    return {
      isValid,
      isPrivate,
      profilePicUrl,
    };
  } catch (error) {
    console.error('Error verifying Instagram username:', error);
    return { isValid: false };
  }
};