import { Product } from "@/components/Products";
import { useEffect, useState } from "react";
import { Alert, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./style";

export function Home() {
  const [products, setProducts] = useState<String[]>([]);
  const [productName, setProductName] = useState('');
  const [error, setError] = useState(false); // State for error handling

  // Effect to automatically clear the error after a timeout
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(false); // Hide the error after 3 seconds
      }, 3000);

      return () => clearTimeout(timer); // Cleanup on unmount or when error changes
    }
  }, [error]);

  function handleGetDateAndTime() {
    return new Date().toLocaleDateString();
  }

  function handleProductAdd() {
    // If the product name is empty, show the error message
    if (productName.trim() === '') {
      setError(true); // Set error to true
      return Alert.alert("Empty Field", "Product name is required.");
    }

    // If the product is already included, show an alert
    if (products.includes(productName)) {
      return Alert.alert("Product Already Included", "This product is already in your wishlist.");
    }

    // Add the product to the list, reset input and error
    setProducts(prevState => [...prevState, productName]);
    setProductName('');
    setError(false); // Reset error after successful addition
  }

  function handleProductRemove(name: string) {
    Alert.alert("Remove Product?", `Do you really want to remove ${name} from the wishlist?`, [
      {
        text: "Yes",
        onPress: () => setProducts(prevState => prevState.filter(product => product !== name)),
      },
      {
        text: "No",
        style: "cancel",
      }
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>WishList</Text>

      <Text style={styles.eventDate}>{handleGetDateAndTime()}</Text>

      <View style={styles.form}>
        <TextInput
          style={[
            styles.input,
            { borderColor: error ? 'red' : '#ccc', flex: 1 }, // Full width with dynamic border color
          ]}
          placeholder="Item Name"
          placeholderTextColor="#6B6B6B"
          onChangeText={(text) => {
            setProductName(text);
            if (text.trim() !== '') {
              setError(false); // Remove error when input is valid
            }
          }}
          value={productName}
        />
        <TouchableOpacity style={styles.button} onPress={handleProductAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Conditionally show error message */}
      {error && <Text style={{ color: 'red', marginBottom: 10 }}>Product name is required</Text>}

      <FlatList
        pagingEnabled={true}
        data={products}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Product key={item} name={item} onRemove={() => handleProductRemove(item)} />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyComponent}>
            Empty Wishlist. When you add an item, it will appear here.
          </Text>
        )}
      />
    </View>
  );
}
