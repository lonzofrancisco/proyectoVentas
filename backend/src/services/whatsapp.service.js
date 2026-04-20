const axios = require('axios');

class WhatsAppService {
  constructor() {
    // En producción, usarías la API real de WhatsApp Business
    // Para desarrollo, simularemos el envío
    this.isDevelopment = process.env.NODE_ENV !== 'production';
  }

  async sendOrderMessage(business, order, customer) {
    try {
      const message = this.buildOrderMessage(business, order, customer);

      if (this.isDevelopment) {
        // En desarrollo, solo logueamos el mensaje
        console.log('📱 WhatsApp Message (Development):', {
          to: business.whatsapp_number,
          message: message
        });
        return { success: true, message: 'Mensaje simulado enviado' };
      }

      // En producción, usarías la API real de WhatsApp
      // Ejemplo con Twilio o 360Dialog:
      /*
      const response = await axios.post('YOUR_WHATSAPP_API_ENDPOINT', {
        to: business.whatsapp_number,
        message: message,
        from: 'YOUR_WHATSAPP_NUMBER'
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.WHATSAPP_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      */

      return { success: true, message: 'Mensaje enviado correctamente' };

    } catch (error) {
      console.error('Error enviando mensaje de WhatsApp:', error);
      return { success: false, error: error.message };
    }
  }

  buildOrderMessage(business, order, customer) {
    let message = `🛒 *Nuevo Pedido - ${business.name}*\n\n`;
    message += `👤 *Cliente:* ${customer.name}\n`;
    message += `📞 *Teléfono:* ${customer.phone}\n`;
    message += `📅 *Fecha:* ${new Date(order.created_at).toLocaleString('es-ES')}\n\n`;
    message += `📋 *Productos:*\n`;

    order.items.forEach(item => {
      message += `• ${item.product_name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}\n`;
    });

    message += `\n💰 *Total: $${order.total}*\n`;
    message += `📍 *Estado:* ${this.getStatusText(order.status)}\n\n`;
    message += `✅ *Pedido confirmado y listo para preparación*`;

    return message;
  }

  getStatusText(status) {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'confirmed': return 'Confirmado';
      case 'delivered': return 'Entregado';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  }
}

module.exports = new WhatsAppService();