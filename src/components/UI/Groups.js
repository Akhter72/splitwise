import { useNavigation } from "@react-navigation/native";
import { FlatList, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import Group from "./Group";

export default function Groups({groups, loading}) {
    const navigation = useNavigation();
    function handleGroup() {
        
    }
    return (
        <FlatList 
            data={groups}
            renderItem={(item) => {
                return <Group group={item.item} loading={loading}/>
            }}
        />
    );
}

const styles = StyleSheet.create({
    item: {
        marginHorizontal: 10,
        marginVertical: 5,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        color: GlobalStyles.colors.primary200,
    }
})