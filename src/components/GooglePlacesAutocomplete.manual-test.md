# Manual Test for GooglePlacesAutocomplete Silent Selection

## Test Case: Initial Value with Remote ID should not trigger onSelect

### Setup

```jsx
const [callCount, setCallCount] = useState(0);
const handleSelect = (place) => {
    setCallCount(prev => prev + 1);
    console.log('onSelect called:', place);
};

<GooglePlacesAutocomplete
    initialValue="New York"
    remoteId="ChIJOwg_06VPwokRYv534QaPC8g"
    onSelect={handleSelect}
    apiBaseUrl="https://your-api.com"
/>

<div>onSelect called {callCount} times</div>
```

### Expected Behavior

1. Component mounts
2. API is called with `input: "New York"`
3. Place with matching `remoteId` is found
4. Input is populated with the place description
5. **onSelect is NOT called** (callCount remains 0)
6. Display shows "onSelect called 0 times"

### Test User Interaction

After initial load:

1. User types in the input
2. User selects a suggestion
3. **onSelect IS called** (callCount increases to 1)
4. Display shows "onSelect called 1 times"

### Debugging

Add console.logs to verify:

```jsx
// In the component
console.log("isSilentModeRef before handleSelect:", isSilentModeRef.current);

// In handleSelect
console.log("handleSelect called, silent mode:", isSilentModeRef.current);
```

### Known Issues Fixed

-   ✅ onSelect being called on initial mount with remoteId
-   ✅ Dependency chain causing re-initialization
-   ✅ handleSelect capturing stale onSelect reference
