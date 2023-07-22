import { View, ScrollView, StyleSheet,TouchableOpacity,Text} from "react-native";

const CustomTabBar = ({ state, descriptors, navigation }) => {

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel || route.name;
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              style={[
                styles.tabItem,
                isFocused ? styles.tabItemFocused : null,
              ]}
            >
              <Text style={isFocused?styles.tabLabel:styles.tabLabel2}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60, 
    alignItems:'center',
    borderTopEndRadius:20,
    borderTopStartRadius:20,
    backgroundColor:'#bfbfbf',
    elevation:4,
    
  },
  scrollView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  tabItem: {
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  tabItemFocused: {
    backgroundColor: "black", 
  },
  tabLabel: {
    fontWeight: "bold",
    color:'white',
    fontSize: 15,
  },
  tabLabel2: {
    fontWeight: "bold",
    color:'black',
    fontSize: 15,
  },
});

export default CustomTabBar;
