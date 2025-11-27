import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Componentes
import { Button } from '@/components/button';
import { InputTitle } from '@/components/inputTitle';
import { ProfilePhoto } from '@/components/profilePhoto';
import { SuccessCard } from '@/components/successCard';

// Hook e Estilos
import { useEditProfile } from './useEditProfile';
import { styles } from './styles';
import { theme } from '@/theme/theme';
import { isValidPassword } from '@/utils/validation';

const EditProfileScreen = () => {
    const {
        currentPassword, setCurrentPassword,
        newPassword, setNewPassword,
        confirmPassword, setConfirmPassword,
        isTechnician,
        specialty, setSpecialty,
        phone, setPhone,
        loading,
        showSuccess,
        errors,
        setShowSuccess,
        showPassword,
        setShowPassword,
        clearError,
        handleUpdateProfile,
        handleLogout,
        handleGoBack,
        handleNavigateHome
    } = useEditProfile();

    // Validar critérios de senha em tempo real
    const passwordValidation = newPassword ? isValidPassword(newPassword) : null;

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={-150}
            style={styles.container}
        >
            <SuccessCard
                visible={showSuccess}
                message="Cadastro atualizado com sucesso!"
                onHide={() => setShowSuccess(false)}
            />

            <ScrollView
                style={{ width: "100%" }}
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                {/* Topo */}
                <View style={styles.topSection}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={handleGoBack}>
                            <MaterialCommunityIcons
                                name={"arrow-left"}
                                size={48}
                                color={theme.colors.text}
                            />
                        </TouchableOpacity>
                        <Text style={styles.title}>Editar Perfil</Text>
                        {/* View vazia para balancear o layout se necessário */}
                        <View style={{ width: 48 }} />
                    </View>
                </View>

                {/* Formulário */}
                <View style={styles.body}>
                    {/* Campos de Técnico */}
                    {isTechnician && (
                        <>
                            <View style={{ width: '100%' }}>
                                <InputTitle
                                    title='Especialidade'
                                    icon='briefcase'
                                    placeholder='Ex: Eletricista'
                                    value={specialty}
                                    onChangeText={(text) => {
                                        setSpecialty(text);
                                        clearError('specialty');
                                    }}
                                />
                                {errors.specialty && <Text style={styles.errorText}>{errors.specialty}</Text>}
                            </View>

                            <View style={{ width: '100%' }}>
                                <InputTitle
                                    title='Telefone Profissional'
                                    icon='phone'
                                    placeholder='(XX) XXXXX-XXXX'
                                    value={phone}
                                    keyboardType='phone-pad'
                                    onChangeText={(text) => {
                                        setPhone(text);
                                        clearError('phone');
                                    }}
                                />
                                {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
                            </View>
                        </>
                    )}

                    {/* Senha Atual */}
                    <View style={{ width: '100%' }}>
                        <InputTitle
                            title='Senha atual'
                            icon='lock'
                            isPsw={true}
                            placeholder='Digite sua senha atual'
                            value={currentPassword}
                            showPassword={showPassword}
                            onTogglePassword={() => setShowPassword(!showPassword)}
                            onChangeText={(text) => {
                                setCurrentPassword(text);
                                clearError('currentPassword');
                            }}
                        />
                        {errors.currentPassword && <Text style={styles.errorText}>{errors.currentPassword}</Text>}
                    </View>

                    {/* Nova Senha */}
                    <View style={{ width: '100%' }}>
                        <InputTitle
                            title='Nova senha'
                            icon='lock'
                            isPsw={true}
                            placeholder='Digite sua nova senha'
                            value={newPassword}
                            showPassword={showPassword}
                            onTogglePassword={() => setShowPassword(!showPassword)}
                            onChangeText={(text) => {
                                setNewPassword(text);
                                clearError('newPassword');
                            }}
                        />
                        {passwordValidation && (
                            <Text style={styles.validationText}>
                                {passwordValidation.message}
                            </Text>
                        )}
                        {errors.newPassword && <Text style={styles.errorText}>{errors.newPassword}</Text>}
                    </View>

                    {/* Confirmar Nova Senha */}
                    <View style={{ width: '100%' }}>
                        <InputTitle
                            title='Confirme sua senha'
                            isPsw={true}
                            icon='lock'
                            placeholder='Digite sua senha novamente'
                            value={confirmPassword}
                            showPassword={showPassword}
                            onTogglePassword={() => setShowPassword(!showPassword)}
                            onChangeText={(text) => {
                                setConfirmPassword(text);
                                clearError('confirmPassword');
                            }}
                        />
                        {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
                    </View>

                    <Button
                        title={loading ? 'Atualizando...' : 'Atualizar Cadastro'}
                        onPress={handleUpdateProfile}
                        disabled={loading}
                    />

                    <Button
                        title='Sair da Conta'
                        onPress={handleLogout}
                    // Opcional: Adicionar estilo secundário (ex: cor vermelha ou outline) no futuro
                    />
                </View>

                {/* Rodapé */}
                <View style={styles.footer}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={handleNavigateHome}
                        style={styles.footerButton}
                    >
                        <MaterialCommunityIcons
                            name={"home"}
                            size={48}
                            color={theme.colors.primary}
                        />
                    </TouchableOpacity>

                    {/* Foto de Perfil (apenas visual, pois já estamos na edição) */}
                    <View style={styles.footerButton}>
                        <ProfilePhoto size={48} />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default EditProfileScreen;