import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CategoryScreen from "./category-screen";
import QuestionScreen from "./question-screen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Categories" component={CategoryScreen} />
        <Stack.Screen name="Questions" component={QuestionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}