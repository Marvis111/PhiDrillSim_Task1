import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import screens from '../navigations/screens';

const HomeScreen: React.FC = () => {
  type Target = {
    north: string;
    east: string;
    tvd: string;
  };
  
  const [surfaceLocation, setSurfaceLocation] = useState({ north: '', east: '', tvd: '' });
  const [targets, setTargets] = useState<Target[]>([]);
  const navigation = useNavigation();

  const handleAddTarget = () => {
    setTargets([...targets, { north: '', east: '', tvd: '' }]);
  };

  const handleRemoveTarget = (index: number) => {
    const updatedTargets = targets.filter((_, i) => i !== index);
    setTargets(updatedTargets);
  };

  const handleTargetChange = (index: number, key: keyof Target, value: string) => {
    const updatedTargets = [...targets];
    updatedTargets[index][key] = value;
    setTargets(updatedTargets);
  };

  const handlePlan = () => {
    // Validation for Surface Location
    if (!surfaceLocation.north || !surfaceLocation.east || !surfaceLocation.tvd) {
      Alert.alert("Validation Error", "Please fill in all Surface Location fields.");
      return;
    }
  
    // Validation for Targets: At least one target must be filled
    if (targets.length === 0) {
      Alert.alert("Validation Error", "Please add at least one Target Location.");
      return;
    }
  
    let atLeastOneTargetFilled = false;
  
    for (let i = 0; i < targets.length; i++) {
      if (targets[i].north && targets[i].east && targets[i].tvd) {
        atLeastOneTargetFilled = true;
      } else if (!targets[i].north || !targets[i].east || !targets[i].tvd) {
        Alert.alert("Validation Error", `Please fill in all fields for Target ${i + 1}.`);
        return;
      }
    }
  
    if (!atLeastOneTargetFilled) {
      Alert.alert("Validation Error", "Please ensure at least one Target Location is completely filled.");
      return;
    }
    // If validation is successful, navigate to a new route with the data
    navigation.navigate(screens.CalculationTable, { surfaceLocation, targets });
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Directional Survey Methods</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Surface Location</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={surfaceLocation.north}
          onChangeText={(text) => setSurfaceLocation({ ...surfaceLocation, north: text })}
          placeholder="N (ft)"
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={surfaceLocation.east}
          onChangeText={(text) => setSurfaceLocation({ ...surfaceLocation, east: text })}
          placeholder="E (ft)"
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={surfaceLocation.tvd}
          onChangeText={(text) => setSurfaceLocation({ ...surfaceLocation, tvd: text })}
          placeholder="TVD (ft)"
        />
      </View>
      {targets.map((target, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.label}>Target {index + 1} </Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={target.north}
            onChangeText={(text) => handleTargetChange(index, 'north', text)}
            placeholder="N (ft)"
          />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={target.east}
            onChangeText={(text) => handleTargetChange(index, 'east', text)}
            placeholder="E (ft)"
          />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={target.tvd}
            onChangeText={(text) => handleTargetChange(index, 'tvd', text)}
            placeholder="TVD (ft)"
          />
          <TouchableOpacity onPress={() => handleRemoveTarget(index)} style={styles.removeButton}>
            {/* <Icon name="trash" size={20} color="#fff" /> */}
            <Text style={styles.removeButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      ))}

      <View style={styles.bottomRow}>
        <TouchableOpacity style={styles.unitToggle} onPress={handleAddTarget}>
          <Text style={styles.unitText}>Add Target</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomRow}>
        <TouchableOpacity style={styles.unitPlan} onPress={handlePlan}>
          <Text style={styles.unitPlanText}>Plan</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    marginTop: 50,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    flex: 1,
    fontSize: 16,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginHorizontal: 8,
    textAlign: 'center',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  unitToggle: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#007AFF',
    fontWeight: '800',
    marginHorizontal: 8,
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
  },
  unitPlan: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#007AFF',
    fontWeight: '800',
    marginHorizontal: 8,
    borderRadius: 20,
    backgroundColor: '#007AFF',
  },
  unitPlanText: {
    color: 'white',
    textAlign: 'center',
  },
  unitText: {
    color: '#000',
    textAlign: 'center',
  },
  removeButton: {
    padding: 4,
    backgroundColor: '#ff4d4d',
    borderRadius: 4,
    marginLeft: 8,
    paddingLeft: 10,
    paddingRight: 10,
  },
  removeButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});
